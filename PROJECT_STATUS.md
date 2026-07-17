# YudNing — Project Status & Handoff Document

> **วัตถุประสงค์ของเอกสารนี้:** ใช้เป็น handoff document สำหรับ AI model ที่จะมาทำงานต่อ
> อ่านเอกสารนี้ก่อนเสมอ แล้วจึงอ่าน `YudNing.md` สำหรับรายละเอียด spec ฉบับเต็ม

---

## สถานะโปรเจ็กต์โดยรวม

| รายการ | ค่า |
|--------|-----|
| วันที่อัพเดทล่าสุด | **2026-07-17 (Session 8)** |
| Phase ปัจจุบัน | **Phase 5 — Quality (เสร็จสิ้น - รอข้อมูลจริงเพิ่มเติมและรอดำเนินการ Deploy)** |
| Phase ที่เสร็จแล้ว | Phase 1–5 ✅ |
| สถานะ Deploy | ❌ ยังไม่ได้ Deploy (ติดปัญหา Repository Not Found) |
| สถานะ Production Build | ✅ `npm run build` ผ่านแล้ว (0 errors) |
| สถานะ Dev Server | ✅ ทำงานได้ด้วย `npm run dev` |

---

## Current Task

Phase 5 เสร็จสมบูรณ์แล้ว: SEO + EmptyState + Responsive + Accessibility + Error States

**Session 8 เสร็จแล้ว (VideoPlayer Bug Fix):**
- ตรวจสอบและแก้ไขบั๊กใน `VideoPlayer.tsx` ที่ทำให้ YouTube Embed เล่นไม่ได้ในบางครั้ง
- ปรับแก้ URL ของ `iframe` ให้ใช้รูปแบบมาตรฐาน `https://www.youtube.com/embed/VIDEO_ID?autoplay=1` (รองรับ parameter `start` อย่างถูกต้อง)
- เพิ่ม iframe attributes เพื่อความปลอดภัยและการรองรับฟีเจอร์ครบถ้วน (`allow`, `allowFullScreen`, `referrerPolicy="strict-origin-when-cross-origin"`)
- เพิ่ม UI ข้อความสำรองและปุ่ม "รับชมบน YouTube" ใต้ Player ในกรณีที่วิดีโอไม่สามารถเล่นผ่าน Embed ได้ (ลิงก์จะเปิดไปที่เวลาที่กำหนดในแท็บใหม่)
- ทดสอบรัน Production Build (`npm run build`) ผ่านสมบูรณ์ (0 Errors)

**ยังเหลือใน Phase 5 และ Phase 6 (Blockers):**
- ใส่ข้อมูลจริงเพิ่มใน `topics.ts` และ `videos.ts` สำหรับวิดีโออื่นๆ ต่อไป
- สร้าง GitHub Repository บนบัญชี `Jakra1601` เพื่อให้สามารถ Deploy ได้

---

## Next Action (รอเจ้าของโปรเจ็กต์ดำเนินการ)

1. **[Blocker]** ตรวจสอบข้อมูลวิดีโอ (vid-01) และเปลี่ยนสถานะจาก `draft` เป็น `verified`
2. **[Blocker]** ทยอยเพิ่มข้อมูลวิดีโอจริงจากช่อง "ธรรมะ โฆษก" จนครอบคลุมทุกหัวข้อ และเปลี่ยนสถานะเป็น `verified`
3. **[Blocker]** สร้าง GitHub Repository ชื่อ `YudNing` ในบัญชี GitHub `Jakra1601`
4. Deploy ไปยัง GitHub Pages (`npm run deploy`)

---

## Blockers

1. **ข้อมูลจริง:** ปัจจุบันมีการเพิ่มข้อมูลวิดีโอ 1 รายการ และ 6 หัวข้อเปลี่ยนสถานะเป็น `draft` แล้ว แต่ยังเหลือหัวข้อที่เป็น `placeholder` ซึ่งยังไม่สามารถใช้งานได้จริง
2. **การ Deploy:** `npm run deploy` ไม่สำเร็จเนื่องจาก `https://github.com/Jakra1601/YudNing.git` แจ้งเตือนว่า Repository not found เจ้าของโปรเจ็กต์ต้องสร้าง Repository บน GitHub ก่อน

---

## Tech Stack ที่ใช้จริง

| รายการ | ค่า |
|--------|-----|
| Framework | React 18 + Vite 5 + TypeScript 5 |
| Styling | **Tailwind CSS v3** + CSS Variables (Design Tokens) |
| Routing | React Router DOM v6 → **HashRouter** (สำหรับ GitHub Pages) |
| Search | Fuse.js v7 |
| Icons | Lucide React |
| Deploy | gh-pages → GitHub Pages |
| Font (Thai) | Noto Sans Thai |
| Font (Heading/EN) | Inter |

---

## Deployment Configuration

| รายการ | ค่า |
|--------|-----|
| GitHub Username | `Jakra1601` |
| Repository Name | `YudNing` |
| Production URL | `https://jakra1601.github.io/YudNing/` |
| Vite Base Path | `/YudNing/` (ตั้งใน `vite.config.ts`) |
| Router Type | `HashRouter` |
| Deploy Command | `npm run deploy` |

> IMPORTANT: ใช้ `HashRouter` เท่านั้น ห้ามเปลี่ยนเป็น `BrowserRouter`
> เพราะ GitHub Pages ไม่รองรับ server-side routing

---

## โครงสร้างไฟล์จริงในปัจจุบัน

```
YudNing/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json     <- แก้ไขแล้ว (composite:true, ลบ noEmit)
├── index.html
├── YudNing.md              <- Project Specification (อ่านสำหรับ spec เต็ม)
├── PROJECT_STATUS.md       <- เอกสารนี้ (อัพเดททุกครั้งที่ทำงาน)
└── src/
    ├── App.tsx             <- Routing หลัก (HashRouter + ErrorBoundary)
    ├── main.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      [DONE]
    │   │   ├── Footer.tsx      [DONE]
    │   │   └── DevBanner.tsx   [DONE]
    │   ├── common/
    │   │   ├── StatusBadge.tsx [DONE]
    │   │   ├── EmptyState.tsx  [DONE]
    │   │   └── ErrorBoundary.tsx [DONE] (NEW — Phase 5)
    │   ├── topics/
    │   │   └── TopicCard.tsx   [DONE]
    │   └── videos/
    │       ├── VideoCard.tsx       [DONE]
    │       ├── VideoPlayer.tsx     [DONE] (FIXED - Session 8)
    │       ├── TimestampList.tsx   [DONE]
    │       └── SourceReference.tsx [DONE]
    ├── pages/
    │   ├── HomePage.tsx        [DONE]
    │   ├── StartHerePage.tsx   [DONE]
    │   ├── LearnPage.tsx       [DONE]
    │   ├── TopicsPage.tsx      [DONE]
    │   ├── TopicDetailPage.tsx [DONE]
    │   ├── LibraryPage.tsx     [DONE]
    │   ├── SearchPage.tsx      [DONE]
    │   ├── FAQPage.tsx         [DONE]
    │   ├── AboutPage.tsx       [DONE]
    │   └── NotFoundPage.tsx    [DONE]
    ├── data/
    │   ├── topics.ts       [DONE] (15 topics: 6 draft, 9 placeholder)
    │   ├── videos.ts       [PARTIAL] มีข้อมูล 1 วิดีโอจริง ('vid-01')
    │   ├── categories.ts   [DONE]
    │   └── faq.ts          [DONE] (FAQ + LearningPaths)
    ├── hooks/
    │   ├── useSearch.ts    [DONE]
    │   └── usePageSEO.ts   [DONE]
    ├── types/
    │   ├── topic.ts        [DONE]
    │   ├── video.ts        [DONE]
    │   └── category.ts     [DONE]
    ├── utils/
    │   ├── youtube.ts      [DONE]
    │   └── slugify.ts      [DONE]
    └── styles/
        └── global.css      [DONE]
```

### Components ที่ระบุใน spec แต่ยังไม่ได้สร้าง

- `components/layout/MobileMenu.tsx` — ยังไม่มี
- `components/layout/PageContainer.tsx` — ยังไม่มี
- `components/common/Button.tsx` — ยังไม่มี (ใช้ inline Tailwind แทน)
- `components/common/SearchBar.tsx` — ยังไม่มี
- `components/common/SectionHeader.tsx` — ยังไม่มี
- `components/common/Tag.tsx` — ยังไม่มี
- `components/common/Breadcrumb.tsx` — ยังไม่มี
- `components/topics/TopicGrid.tsx` — ยังไม่มี
- `components/topics/TopicFilter.tsx` — ยังไม่มี
- `components/topics/RelatedTopics.tsx` — ยังไม่มี
- `components/home/HeroSection.tsx` — ยังไม่มี (อยู่ใน HomePage.tsx โดยตรง)
- `components/home/FeaturedTopics.tsx` — ยังไม่มี
- `components/home/BeginnerSection.tsx` — ยังไม่มี
- `components/home/FeaturedVideo.tsx` — ยังไม่มี
- `data/learningPaths.ts` — รวมอยู่ใน `faq.ts` แทน (export ชื่อ `learningPaths`)
- `router.tsx` — routing อยู่ใน `App.tsx` โดยตรง

---

## สิ่งที่ทำเสร็จแล้ว

### Phase 1: Foundation — เสร็จสมบูรณ์
- [x] สร้าง React + Vite + TypeScript project
- [x] ตั้งค่า Tailwind CSS v3 + CSS Variables (Design Tokens ครบ)
- [x] ตั้งค่า HashRouter สำหรับ GitHub Pages
- [x] Design System: สี, font, radius, shadow, animation ครบ
- [x] `Header.tsx` — Navigation ครบ, Responsive, มี active state
- [x] `Footer.tsx` — ครบ
- [x] `DevBanner.tsx` — Banner "กำลังพัฒนา" ปิดได้ด้วย sessionStorage

### Phase 2: Core Pages — เสร็จสมบูรณ์
- [x] `HomePage.tsx` — Hero, Search Box, Featured Topics, Beginner Section
- [x] `StartHerePage.tsx` — 5 ขั้นตอน พร้อม Links ไปยัง Topics
- [x] `LearnPage.tsx` — Learning Paths (Beginner / Problems / Deeper)
- [x] `TopicsPage.tsx` — แสดงหมวดหมู่ + TopicCard grid
- [x] `TopicDetailPage.tsx` — Topic แบบละเอียด, Related Topics, Source Reference
- [x] `LibraryPage.tsx` — แสดง VideoCard grid
- [x] `SearchPage.tsx` — Search ด้วย Fuse.js, แสดงผลแบบ real-time
- [x] `FAQPage.tsx` — Accordion FAQ
- [x] `AboutPage.tsx` — About + Disclaimer
- [x] `NotFoundPage.tsx` — 404 page

### Phase 3: Data & Search — เสร็จสมบูรณ์
- [x] TypeScript Types: `Topic`, `Video`, `Category`, `FAQ`, `LearningPath`
- [x] `data/topics.ts` — 15 topics (อัปเดตสถานะ draft บางส่วน)
- [x] `data/categories.ts` — 5 หมวด: beginner, problems, mind, experience, after
- [x] `data/faq.ts` — FAQ 18 ข้อ + LearningPaths 3 เส้นทาง
- [x] `data/videos.ts` — เริ่มมีข้อมูลจริง
- [x] `hooks/useSearch.ts` — Fuse.js search ด้วย weighted fields
- [x] `utils/youtube.ts` — สร้าง YouTube URL + Timestamp URL
- [x] `utils/slugify.ts` — Thai-safe slugify

### Phase 4: YouTube Integration — เสร็จสมบูรณ์ ✅
- [x] `SourceReference.tsx` — Component แสดงแหล่งอ้างอิงพร้อม YouTube link
- [x] `VideoCard.tsx` — อัพเดท: + `isSelected`, `onSelect` props, ลบ VideoPlayer ซ้ำออก
- [x] `VideoPlayer.tsx` — **NEW** — Lazy-loading thumbnail + click-to-play iframe, timestamp label
- [x] `TimestampList.tsx` — **NEW** — รายการ timestamp + jump player + เปิด YouTube
- [x] `TopicDetailPage.tsx` — อัพเดท: รวม `RelatedVideosSection` พร้อม VideoPlayer + TimestampList
- [x] แก้ `tsconfig.node.json` — เพิ่ม `composite:true`, ลบ `noEmit`
- [x] แก้ import path `StatusBadge` ใน `TopicCard.tsx` (common/ ไม่ใช่ topics/)
- [x] แก้ unused `useState` imports ใน `SearchPage.tsx` และ `TopicsPage.tsx`
- [x] `npm run build` ผ่านแล้ว — 0 TypeScript errors

### Phase 5: Quality — เสร็จสมบูรณ์ ✅
- [x] SEO meta tags — `usePageSEO` hook ครบทุกหน้า (HomePage, StartHere, Learn, Topics, TopicDetail, Library, Search, FAQ, About, **NotFound**)
- [x] `EmptyState.tsx` — component สร้างแล้ว ใช้ใน TopicsPage และ LibraryPage
- [x] Responsive — ปรับ Hero section padding, CTA buttons สำหรับ 320px, CSS media query
- [x] Accessibility — เพิ่ม focus-visible ครบทุก interactive element, แก้ Header mobile menu bug
- [x] Error States — เพิ่ม `ErrorBoundary` ครอบหน้าแอปทั้งหมดเพื่อรับมือกับ render errors
- [x] **[Session 8]** แก้บั๊ก `VideoPlayer.tsx` เพิ่ม Fallback UI และตรวจสอบความถูกต้องของ iframe src

### Phase 6: Deployment — ติด Blocker
- [ ] Deploy บน GitHub Pages (`npm run deploy`) — **Blocker: Repository Not Found**
- [ ] ตรวจสอบลิงก์ทั้งหมด
- [ ] ตรวจสอบ mobile จริง
- [ ] ตรวจสอบ meta & social preview

---

## สิ่งที่ต้องทำต่อ (เรียงตามลำดับความสำคัญ)

### ลำดับความสำคัญสูง (Phase 5 & 6 — Blockers)

1. **เปลี่ยนสถานะข้อมูลเป็น Verified**
   - ตรวจสอบข้อมูลวิดีโอ (vid-01) และเปลี่ยนสถานะจาก `draft` เป็น `verified` (รอคำสั่ง)

2. **สร้าง GitHub Repository**
   - สร้าง repository ชื่อ `YudNing` บน GitHub ภายใต้บัญชี `Jakra1601` เพื่อให้ `gh-pages` สามารถพุชโค้ดไปได้

3. **ใส่ข้อมูลจริงใน `topics.ts` และ `videos.ts` เพิ่มเติม**
   - ทยอยเพิ่มข้อมูลวิดีโอจากช่อง "ธรรมะ โฆษก" จนครอบคลุมทุกหัวข้อ

4. **Deploy** 
   - รัน `npm run deploy` ไปยัง GitHub Pages หลังจากแก้ไข blockers เรื่อง Repository แล้ว

### ลำดับความสำคัญต่ำ

5. **Version 1.1 Features** (ดูใน `YudNing.md` → Version 1.1 Features)
   - Learn Page Progress (localStorage)
   - Continue Learning

---

## Data Status — สถานะข้อมูลปัจจุบัน

### Topics (15 รายการ) — ทั้งหมดเป็น placeholder

| ID | Slug | Title | Status |
|----|------|-------|--------|
| topic-01 | what-is-meditation | สมาธิคืออะไร | placeholder |
| topic-02 | how-to-start | เริ่มนั่งสมาธิอย่างไร | placeholder |
| topic-03 | sitting-posture | ท่านั่งสมาธิสำหรับผู้เริ่มต้น | placeholder |
| topic-04 | body-relaxation | วิธีผ่อนคลายร่างกายก่อนนั่ง | placeholder |
| topic-05 | how-to-place-mind | วิธีวางใจเบื้องต้น | placeholder |
| topic-06 | drowsy-during-meditation | นั่งสมาธิแล้วง่วง ควรทำอย่างไร | placeholder |
| topic-07 | restless-mind | ใจฟุ้งซ่าน ควรทำอย่างไร | placeholder |
| topic-08 | leg-pain | นั่งแล้วปวดขา ควรทำอย่างไร | placeholder |
| topic-09 | cannot-visualize | นึกภาพไม่ออก ทำอย่างไร | placeholder |
| topic-10 | how-long-to-meditate | ควรนั่งสมาธิกี่นาที | placeholder |
| topic-11 | meditation-before-sleep | นั่งสมาธิก่อนนอนได้ไหม | placeholder |
| topic-12 | no-expectations | ไม่ควรคาดหวังผลอย่างไร | placeholder |
| topic-13 | consistent-practice | ฝึกสมาธิให้ต่อเนื่องได้อย่างไร | placeholder |
| topic-14 | maintaining-mind-daily | วิธีรักษาใจระหว่างวัน | placeholder |
| topic-15 | seeing-light | เห็นแสงขณะนั่งสมาธิ หมายความว่าอะไร | placeholder |

### Videos
- **สถานะ:** มีวิดีโอ placeholder 1 รายการ (`data/videos.ts`)
- ยังไม่มีวิดีโอจริงจากช่อง "ธรรมะ โฆษก"
- `LibraryPage.tsx` แสดง empty state เมื่อไม่มีวิดีโอ

### Learning Paths (3 เส้นทาง ใน `data/faq.ts`)
- **Beginner Path** — topic-01 ถึง topic-08
- **Common Problems Path** — topic-06, 07, 08, 09, 12
- **Deeper Practice Path** — topic-05, 12, 13, 14, 15

---

## Design System Reference

### CSS Variables (ใน `src/styles/global.css`)

```css
--color-primary:        #3D7A6E;  /* เขียว teal */
--color-primary-hover:  #32675D;
--color-primary-soft:   #E5F0ED;
--color-secondary:      #6B8FA3;
--color-accent:         #B8935A;
--color-background:     #F7F5F0;
--color-surface:        #FFFFFF;
--color-text-main:      #2D3436;
--color-text-muted:     #636E72;
--color-border:         #E8E4DC;
--color-focus-ring:     #5B9489;
--color-error:          #A65353;
--color-success:        #477A61;

--radius-card: 12px;
--radius-btn:  8px;
--radius-sm:   6px;

--shadow-card:       0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 16px rgba(0,0,0,0.10);
```

### Utility Classes (ใน `global.css`)
- `.container-content` — max-width: 760px (สำหรับเนื้อหาบทความ)
- `.container-wide` — max-width: 1100px (สำหรับ grid layout)
- `.animate-fade-in-up` — animation เข้า (0.35s)
- `.animate-fade-in` — animation fade (0.25s)
- `.prose` — สำหรับ article content

---

## กฎสำคัญที่ต้องยึดถือตลอดการพัฒนา

1. **แหล่งข้อมูลเดียว:** ทุกเนื้อหาต้องมาจาก YouTube ช่อง "ธรรมะ โฆษก" เท่านั้น
2. **Mock Data ต้องแสดง Label:** ทุก topic ที่เป็น `status: 'placeholder'` ต้องแสดงข้อความ "ข้อมูลตัวอย่าง — รอการตรวจสอบจากวิดีโอต้นฉบับ"
3. **ห้ามสร้างเนื้อหาเอง:** ห้าม AI หรือผู้พัฒนาเขียนคำสอนสมาธิขึ้นเอง ต้องใช้จากวิดีโอต้นฉบับเท่านั้น
4. **Source Transparency:** ทุก topic ที่มีเนื้อหาจริงต้องแสดง `SourceReference` ชี้ไปยังวิดีโอต้นฉบับ
5. **HashRouter:** ห้ามเปลี่ยน Router ไปเป็น BrowserRouter เพราะ GitHub Pages ไม่รองรับ
6. **TypeScript Strict:** ห้ามใช้ `any` โดยไม่จำเป็น

---

## คำสั่งสำคัญ

```bash
# รัน Development Server
npm run dev

# Build Production
npm run build

# Preview Production Build
npm run preview

# Deploy ไปยัง GitHub Pages
npm run deploy
```

---

## AI Development Workflow

`PROJECT_STATUS.md` เป็นเอกสารหลักสำหรับติดตามสถานะของโครงการ และใช้เป็น Handoff Document สำหรับการส่งต่องานระหว่าง AI Models ทุกตัว ดังนั้น AI ทุกตัวที่ทำงานกับโปรเจกต์นี้ต้องปฏิบัติตาม Workflow เดียวกัน เพื่อให้การพัฒนาต่อเนื่อง ถูกต้อง และลดโอกาสเกิด Context หรือ Token หมดระหว่างการทำงาน

### ก่อนเริ่มทำงาน

1. อ่าน `PROJECT_STATUS.md` เพื่อรับทราบสถานะล่าสุดของโครงการ
2. อ่าน `YudNing.md` เพื่ออ้างอิงข้อกำหนด (Specification) ทั้งหมด
3. ตรวจสอบสถานะจริงของโค้ดและโครงสร้างไฟล์ก่อนเริ่มทำงาน
4. หากพบว่า `PROJECT_STATUS.md` ไม่ตรงกับโค้ดจริง ให้แก้ไขเอกสารนี้ก่อน โดยอ้างอิงจากโค้ดและผลการตรวจสอบจริงเท่านั้น

---

### ระหว่างทำงาน

- ทำงานเป็น **Session** เท่านั้น
- ทำเฉพาะ `Current Task` หรือกลุ่มงานที่เกี่ยวข้อง
- ห้ามเริ่มหลาย Phase พร้อมกัน
- หากงานมีขนาดใหญ่ ให้แบ่งออกเป็นหลาย Session และเลือกจุดที่เหมาะสมในการหยุด
- หากประเมินว่างานมีขนาดใหญ่เกินไป หรืออาจใช้ Context / Token มากเกินความจำเป็น ให้หยุดเมื่อจบงานย่อยที่สมบูรณ์ แล้วอัปเดต `PROJECT_STATUS.md` ก่อนเสมอ แทนการพยายามทำทุกอย่างให้เสร็จในครั้งเดียว
- หากพบ Blocker ให้บันทึกไว้ใน `PROJECT_STATUS.md`

---

### การจัดการข้อมูลจาก YouTube

- ประมวลผลเพียง 1 วิดีโอต่อ 1 Session เท่านั้น
- ใช้เฉพาะวิดีโอจากช่อง YouTube "ธรรมะ โฆษก"
- หากสามารถเข้าถึงวิดีโอต้นฉบับได้ ให้ใช้ข้อมูลจากวิดีโอต้นฉบับเป็นหลัก
- หากใช้ Transcript จาก YouTube ให้ถือว่าเป็นข้อมูลอ้างอิงเบื้องต้นเท่านั้น เพราะอาจมีข้อผิดพลาดจากการถอดเสียงอัตโนมัติ
- หากพบข้อความที่อาจผิด ไม่ชัดเจน หรืออาจทำให้ความหมายของคำสอนเปลี่ยนไป ให้แจ้งผู้ใช้ตรวจสอบก่อน ห้ามคาดเดาหรือแก้ไขความหมายเอง
- ห้ามสร้าง ตีความ หรือเพิ่มเติมคำสอนนอกเหนือจากข้อมูลที่ตรวจสอบได้จากวิดีโอต้นฉบับ

### ก่อนจบ Session

เมื่อทำงานใน Session นั้นเสร็จแล้ว ให้ดำเนินการดังนี้

1. ตรวจสอบผลลัพธ์จากโค้ดจริง
2. รัน Build หากมีการเปลี่ยนแปลงที่เกี่ยวข้อง
3. ตรวจสอบว่าไม่มี TypeScript Error หรือ Build Error
4. อัปเดต `PROJECT_STATUS.md`
5. สรุปสิ่งที่ทำเสร็จแล้ว
6. อัปเดต `Current Task`
7. อัปเดต `Next Action`
8. อัปเดต `Blockers` (หากมี)
9. หยุดการทำงาน และรอคำสั่งถัดไป

---

### Important Rules

- ห้ามทำเครื่องหมายว่างานเสร็จ หากยังไม่ได้ตรวจสอบจริง
- ห้ามอัปเดต `PROJECT_STATUS.md` จากการคาดเดา ต้องอ้างอิงจากโค้ดและผลการทดสอบจริงเท่านั้น
- หากมีการเปลี่ยน AI Model (เช่น GPT, Claude หรือ Gemini) ให้ AI ตัวใหม่เริ่มต้นจากการอ่าน `PROJECT_STATUS.md` และ `YudNing.md` ก่อนทุกครั้ง
- ห้ามเริ่ม Phase ถัดไป หาก `Current Task` ยังไม่เสร็จ
- หากงานใน Session ปัจจุบันเสร็จแล้ว ให้หยุด รอคำสั่งจากผู้ใช้ก่อนเริ่ม Session ถัดไป

## PROJECT_STATUS Update Protocol

ทุกครั้งที่ทำงานในโปรเจ็กต์นี้เสร็จ ให้อัพเดทเอกสารนี้:

1. อัพเดท **วันที่อัพเดทล่าสุด** ด้านบน (ระบุ Session ด้วย)
2. อัพเดท **สถานะโปรเจ็กต์โดยรวม** — Phase ปัจจุบัน, สถานะ build
3. อัพเดท **Current Task** และ **Next Action**
4. อัพเดท **โครงสร้างไฟล์** หากมีไฟล์ใหม่
5. อัพเดท **สิ่งที่ทำเสร็จแล้ว** (เปลี่ยน `[ ]` เป็น `[x]`)
6. อัพเดท **สิ่งที่ต้องทำต่อ** (เพิ่ม/ลบ/เปลี่ยนลำดับ)
7. อัพเดท **Data Status** หากมีการเปลี่ยน status ของ topics หรือเพิ่มวิดีโอ

---

*เอกสารนี้สร้างเมื่อ 2026-07-15 Session 1 | อัพเดทล่าสุด Session 6 (2026-07-17)*
