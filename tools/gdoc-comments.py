"""
Google Docs HTML → Clean Text + Comments extractor
Usage: python tools/gdoc-comments.py <input.html> [output.txt]

Strips all CSS/styling, keeps only text content and Aim's comments.
Output is tiny compared to the raw HTML.
"""

import sys
import re
from html.parser import HTMLParser


class GDocExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.comments = {}  # id -> comment text
        self.comment_refs = {}  # ref_id -> anchor text
        self.current_comment_id = None
        self.current_ref_id = None
        self.in_style = False
        self.in_comment = False
        self.in_comment_ref = False
        self.in_sup = False
        self.skip_sup = False
        self.comment_anchors = {}  # maps cmnt_ref id -> surrounding text
        self.current_anchor_text = []
        self.collecting_anchor = False
        # Track comment footnote numbers to skip
        self.skip_content = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        tag_id = attrs_dict.get('id', '')

        # Skip <style> blocks
        if tag == 'style':
            self.in_style = True
            return

        # Detect comment reference in body (the highlighted text)
        if tag == 'a' and 'href' in attrs_dict:
            href = attrs_dict['href']
            if '#cmnt' in href and '#cmnt_ref' not in href:
                # This is the superscript footnote link [a], [b] etc - skip it
                self.skip_sup = True
                return

        # Detect comment anchor spans
        if tag == 'a' and 'id' in attrs_dict:
            if tag_id.startswith('cmnt_ref'):
                self.in_comment_ref = True
                self.current_ref_id = tag_id
                return

        # Detect comment divs
        if tag_id.startswith('cmnt') and not tag_id.startswith('cmnt_ref'):
            self.in_comment = True
            self.current_comment_id = tag_id
            self.comments[tag_id] = []
            return

        if tag == 'sup':
            self.in_sup = True

        # Add line breaks for block elements
        if tag in ('p', 'div', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'tr'):
            if not self.in_comment:
                self.text_parts.append('\n')

        if tag == 'hr':
            if not self.in_comment:
                self.text_parts.append('\n---\n')

    def handle_endtag(self, tag):
        if tag == 'style':
            self.in_style = False
        if tag == 'sup':
            self.in_sup = False
            self.skip_sup = False
        if tag == 'a':
            self.in_comment_ref = False

    def handle_data(self, data):
        if self.in_style:
            return
        if self.skip_sup:
            return

        if self.in_comment:
            self.comments.setdefault(self.current_comment_id, [])
            self.comments[self.current_comment_id].append(data)
        else:
            self.text_parts.append(data)

    def get_clean_text(self):
        text = ''.join(self.text_parts)
        # Clean up excessive whitespace
        text = re.sub(r'\n{3,}', '\n\n', text)
        text = re.sub(r' +', ' ', text)
        return text.strip()

    def get_comments(self):
        result = []
        # Sort by comment number
        sorted_ids = sorted(
            [k for k in self.comments.keys()],
            key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0
        )
        for cid in sorted_ids:
            parts = self.comments[cid]
            text = ''.join(parts).strip()
            if text:
                num = re.search(r'\d+', cid)
                num_str = num.group() if num else '?'
                result.append(f"[Comment {num_str}] {text}")
        return result


def main():
    if len(sys.argv) < 2:
        print("Usage: python gdoc-comments.py <input.html> [output.txt]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    extractor = GDocExtractor()
    extractor.feed(html_content)

    clean_text = extractor.get_clean_text()
    comments = extractor.get_comments()

    output_lines = []
    output_lines.append("=" * 60)
    output_lines.append("CONTENT")
    output_lines.append("=" * 60)
    output_lines.append(clean_text)
    output_lines.append("")
    output_lines.append("=" * 60)
    output_lines.append(f"COMMENTS ({len(comments)} total)")
    output_lines.append("=" * 60)
    for c in comments:
        output_lines.append(c)
        output_lines.append("")

    result = '\n'.join(output_lines)

    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result)
        print(f"Saved to {output_file}")
        print(f"  HTML size: {len(html_content):,} chars")
        print(f"  Text size: {len(result):,} chars")
        print(f"  Reduction: {(1 - len(result)/len(html_content))*100:.0f}%")
    else:
        print(result)


if __name__ == '__main__':
    main()
