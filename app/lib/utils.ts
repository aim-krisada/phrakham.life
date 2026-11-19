import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ตัวช่วยของ shadcn-vue ⇒ รวมชื่อคลาสที่มีเงื่อนไข แล้วให้คลาสของ Tailwind ตัวหลังชนะตัวหน้า
// ⛔ ห้ามเขียนเอง — ชิ้นส่วนของ shadcn-vue ทุกตัวเรียก `cn` จากที่นี่
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
