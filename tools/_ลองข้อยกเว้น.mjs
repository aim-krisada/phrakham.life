import { chromium } from 'playwright'
const ฐาน = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext()
for (const ที่ of ['/read/HOS?c=2&v=1&t=WLC', '/read/JON?c=2&v=1&t=WLC,TCV', '/']) {
  const p = await ctx.newPage()
  const cdp = await ctx.newCDPSession(p)
  const จด = []
  cdp.on('Debugger.paused', (e) => {
    if (e.reason === 'exception' || e.reason === 'promiseRejection') จด.push(`${e.reason} ${String(e.data?.description || '').split('\n')[0].slice(0, 120)} @${e.callFrames[0]?.url.split('/').pop()}:${e.callFrames[0]?.location.lineNumber + 1}`)
    cdp.send('Debugger.resume').catch(() => {})
  })
  await cdp.send('Debugger.enable')
  await cdp.send('Debugger.setPauseOnExceptions', { state: 'all' })
  const t = Date.now()
  await p.goto(ฐาน + ที่)
  await p.waitForFunction(() => !!document.querySelector('#__nuxt')?.__vue_app__)
  console.log(ที่, 'ติดใน', Date.now() - t, 'ms ข้อยกเว้น', จด.length)
  for (const x of จด.slice(0, 10)) console.log('  ', x)
  await p.waitForTimeout(1500)
}
await b.close()
