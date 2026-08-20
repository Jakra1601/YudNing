# YudNing — Project Status & Handoff Document

> **วัตถุประสงค์ของเอกสารนี้:** ใช้เป็น handoff document สำหรับ AI model ที่จะมาทำงานต่อ
> อ่านเอกสารนี้ก่อนเสมอ แล้วจึงอ่าน `YudNing.md` สำหรับรายละเอียด spec ฉบับเต็ม

---

## สถานะโปรเจ็กต์โดยรวม

| รายการ | ค่า |
|--------|-----|
| วันที่อัพเดทล่าสุด | **2026-08-19 (Production Verification — Google OAuth fix)** |
| Phase ปัจจุบัน | **Phase 7 — Authentication (Version 1.2)** |
| Phase ที่เสร็จแล้ว | Phase 1–6 ✅ |
| สถานะ Deploy (Frontend) | ✅ Deploy สำเร็จแล้ว (GitHub Pages) — **Member Personalization V1 deployed 2026-08-18** |
| สถานะ Deploy (LINE OA Backend) | ✅ Deploy สำเร็จแล้ว (Vercel) |
| สถานะ Production Build | ✅ `npm run build` ผ่านแล้ว (0 TypeScript errors, 0 build errors) — ยืนยัน Sessions 21–25 |
| สถานะ Dev Server | ✅ ทำงานได้ด้วย `npm run dev` |
| Git Repository | ✅ `git remote` เชื่อมกับ `https://github.com/Jakra1601/YudNing.git` |

---

## Current Task

> **Session 13 (Supabase Auth Foundation)** เสร็จสมบูรณ์แล้ว — ดูรายละเอียดในส่วน **Phase 7** ด้านล่าง

**Session 33 (Global Navigation Scroll-to-Top Fix):**
- ✅ **Completed / Manual Verified**
- ✅ ทำการ Audit ระบบและพบว่า HashRouter ของ React Router ขาดระบบ Scroll Restoration ตั้งต้น
- ✅ สร้าง `ScrollToTop` component แบบ Route-aware โดยดักจับ `pathname` และ `navType`
- ✅ นำ `ScrollToTop` ไปติดตั้งใน `App.tsx` ภายใต้ HashRouter 
- ✅ รับประกันว่าจะไม่ทำลาย Back/Forward behavior เดิมของ Browser เนื่องจาก Component เช็คเงื่อนไข `navType !== 'POP'` ก่อนทำงาน
- ✅ ยืนยันว่าไม่แตะ Data / Content / Auth / Mobile styling ใดๆ
- ✅ รัน `npm run build` ผ่านสมบูรณ์ (0 errors)

**Session 32 (Topic Relationship Enrichment & Text Correction):**
- ✅ **Completed / Manual Verified**
- ✅ ทำการประเมินโครงสร้าง Relationship (อ้างอิง `relatedQuestions` และ `relatedTopicIds` ใน Data Layer ตามที่ `TopicDetailPage` นำไปแสดงผลจริง)
- ✅ เพิ่ม Relationship Enrichment ให้ `topic-16` ถึง `topic-20` ตามโครงสร้างเดิม โดยอิงตามเนื้อหาที่ผ่านการ Manual Verification
  - 📝 **หมายเหตุ:** `topic-18` และ `topic-19` ตั้งใจไม่มี “หัวข้อที่ควรศึกษาต่อ” เนื่องจากยังไม่มี Topic ที่เกี่ยวข้องโดยตรงใน Data Layer ปัจจุบัน ผู้ใช้ Manual Verify แล้วและยืนยันว่าพฤติกรรมถูกต้อง
- ✅ แก้ไข spacing ของข้อความ "นึกภาพได้หรือไม่ได้ ไม่ได้วัดว่าปฏิบัติถูกหรือผิด"
- ✅ คง Topic ที่ความสัมพันธ์ไม่ชัดเจนไว้เป็น array ว่างตามกฎอย่างเคร่งครัด
- ✅ ยืนยันว่าไม่ได้แก้ Content, Status หรือ Mapping อื่นนอกเหนือ Scope
- ✅ รัน `npm run build` ผ่านสมบูรณ์ (0 errors)

**Session 31 (Part 3: Final Verification & Close Session):**
- ✅ **Completed / Pending Production Manual Verification**
- ✅ อัปเดตสถานะของ Topic จำนวน 10 รายการ (`topic-02`, `03`, `04`, `05`, `15`, `16`, `17`, `18`, `19`, `20`) เป็น `verified` เรียบร้อยแล้ว
- ✅ บันทึกว่า `vid-02` ผ่านการ Manual Verification แล้ว (Video schema ปัจจุบันไม่มีฟิลด์ `status` จึงเก็บสถานะผ่านเอกสารนี้แทน)
- ✅ ยืนยันความถูกต้องของ Bidirectional Mapping (Video <-> Topic) ของ `vid-02` และ Topic ทั้งหมดเรียบร้อยแล้ว ไม่พบความผิดปกติ
- ✅ นำส่วน `practicalSteps` ออกจาก UI อย่างสมบูรณ์ แต่ยังคง Data Layer ไว้
- ✅ รัน `npm run build` สำเร็จ 100% ไม่มีข้อผิดพลาด
- ✅ Commit และ Push เข้าสู่ `main` แล้ว
- ✅ Deploy ขึ้น Production เรียบร้อยแล้ว รอการตรวจสอบจากผู้ใช้ในขั้นสุดท้าย
- 🚧 Next Action: ผู้ใช้ตรวจสอบ Production URL และหากเรียบร้อย สามารถเริ่มทำงานใน Session ใหม่เพื่อเพิ่มวิดีโอรายการถัดไปได้

**Session 31 (Part 2: UI Fix & Mapping RCA):**
- ✅ **Completed / Ready for User Verification**
- ✅ แก้ไขคำผิดใน `topic-02` (แจ่มชื่น -> แช่มชื่น)
- ✅ ปรับ UI ใน `TopicDetailPage.tsx` เพื่อซ่อนส่วน `practicalSteps` ชั่วคราว โดยคง Data Layer ไว้
- ✅ สรุปผล RCA ของ `topic-15`: สาเหตุเกิดจากก่อนหน้านี้มีการ map `vid-02` ผิดพลาดใน `topic-15.relatedVideoIds` (ซึ่งปัจจุบันในโค้ดถูกเอาออกไปเรียบร้อยแล้ว) รวมกับการที่ UI แสดงทั้ง VideoPlayer และ VideoCard สำหรับ 1 วิดีโอ ทำให้ผู้ใช้อาจสับสน ปัจจุบันข้อมูลถูกต้องและอ้างอิงเฉพาะ Source จริงแล้ว

**Session 31 (Content Enrichment — Source-Supported Topics):**
- ✅ **Completed / Ready for User Verification**
- ✅ ทำ Content Enrichment ให้กับ 5 Topics ได้แก่ `topic-02`, `topic-03`, `topic-04`, `topic-05`, และ `topic-15`
- ✅ อัปเดตฟิลด์ `shortAnswer`, `description`, `keyPoints`, และ `practicalSteps` โดยใช้เฉพาะข้อมูลจากวิดีโอ (vid-01 และ vid-02) ตามที่ตรวจสอบจาก Source Audit
- ✅ คงสถานะของ Topic ทั้ง 5 ไว้เป็น `draft` เพื่อรอ Manual Verification จากผู้ใช้
- ✅ ยืนยันว่าไม่ได้แก้ไข Topic อื่นๆ (โดยเฉพาะ `topic-09`) และไม่ได้แก้ไข Mapping / Timestamps
- ✅ `npm run build` ผ่านสมบูรณ์ (0 errors)
- 🚧 Pending Manual Verification: ให้ผู้ใช้เข้าตรวจสอบ Topic ทั้ง 5 บนหน้าเว็บไซต์ ทั้งในส่วนคำตอบสั้นๆ, คำอธิบาย, สาระสำคัญ, และขั้นตอนปฏิบัติ ว่าตรงกับวิดีโอต้นฉบับหรือไม่

**Production Deployment — Member Personalization V1 + Google OAuth Fix (2026-08-19):**
- ✅ **Production Deployed / Verified**
- ✅ Commit deployed to gh-pages: build `index-B2EtVo6d.js` (contains OAuth fix)
- ✅ Production URL: https://jakra1601.github.io/YudNing/
- ✅ Production Smoke Test ผ่านครบ: Home, Topic, Library, Login, Protected Routes
- ✅ **Google Login Production: VERIFIED / WORKING**
  - Fix: `redirectTo: \`${window.location.origin}${window.location.pathname}\`` รักษา `/YudNing/` path หลัง OAuth callback
  - Manual Verified: OAuth redirect ถูกต้อง, Supabase session สร้าง/restore สำเร็จ, Header แสดง authenticated user ถูกต้อง


**Session 29 (Create Approved Candidate Topics from vid-02):**
- ✅ **Completed / Ready for User Verification**
- ✅ ผู้ใช้อนุมัติ Candidate Topics จำนวน 5 Topic จาก Source `vid-02`
- ✅ สร้าง Topic ใหม่ทั้ง 5 ลงใน Data Layer เรียบร้อย: `topic-16` ถึง `topic-20`
- ✅ Topic ทั้ง 5 มีสถานะเป็น `draft` (ยังไม่เป็น `verified`)
- ✅ ทำการเชื่อม Bidirectional Mapping ระหว่าง Topic ทั้ง 5 และ `vid-02.timestamps[].topicIds` สำเร็จแล้ว
- ✅ ปรับแก้ลำดับคำใน summary ของ `ts-02-05` (ใน `videos.ts`) ให้ถูกต้องตามหลักคือ "พุทธรัตนะ ธรรมรัตนะ และสังฆรัตนะ"
- ✅ `npm run build` ผ่านสมบูรณ์ (0 errors)
- 🚧 Pending Manual Verification: ให้ผู้ใช้เข้าตรวจสอบ Topic ใหม่ทั้ง 5 บนหน้าเว็บไซต์ รวมถึงทดสอบลิงก์ที่แสดงความสัมพันธ์กับวิดีโอ ก่อนที่จะปรับแก้สถานะเป็น `verified` ต่อไป

**Session 28 (Fix Topic Mapping UI Issue for vid-02):**
- ✅ **Completed / Ready for User Verification**
- ✅ ตรวจสอบและรายงานสาเหตุที่ Topic Mapping ของ `vid-02` ไม่แสดงผล (เกิดจากโครงสร้างเป็น Bidirectional แต่ใน Session 27 มีการอัปเดตแค่ฝั่ง `videos.ts`)
- ✅ แก้ไขโค้ด `src/data/topics.ts` เพื่อเพิ่ม `vid-02` ลงใน `relatedVideoIds` ของ `topic-03`, `topic-04`, `topic-05`, และ `topic-09` 
- ✅ ตอนนี้ Existing Topic Mapping ของ `vid-02` ถูกทำให้ Bidirectional สมบูรณ์แล้ว
- 🚧 สถานะของ `vid-02` ยังคงเป็น draft และยังรอให้ผู้ใช้ตรวจความถูกต้องของ Transcript และ Timestamp ตามรายงาน Session 27 ก่อนจะเปลี่ยนเป็น verified

**Session 27 (Content Analysis of vid-02):**
- ✅ **Completed / Ready for User Verification**
- ✅ ทำ Content Analysis สำหรับ `vid-02` (ธรรมะเป็นสิ่งที่ทุกคนเข้าถึงได้) โดยใช้ Transcript จาก YouTube
- ✅ เพิ่ม 8 Timestamps และทำ Topic Mapping ตามเนื้อหาจริงที่มีหลักฐานในวิดีโอ
- ✅ รัน `npm run build` ผ่านแล้ว (0 TypeScript errors)
- 🚧 Next Action: ผู้ใช้ตรวจสอบความผิดพลาดของ Transcript และเนื้อหา Timestamp ก่อนจะทำการแก้ไขต่อไป

**Session 26 (Add Video: ธรรมะเป็นสิ่งที่ทุกคนเข้าถึงได้):**
- ✅ รัน `npm run build` ผ่านแล้ว (0 TypeScript errors)
- 🚧 Next Action: ผู้ใช้ตรวจสอบวิดีโอนี้บนเว็บไซต์ หรือเพิ่มวิดีโอถัดไปตามคำสั่ง

**Session 25 (Member Personalization Integration Verification):**
- ✅ **Completed / Manually Verified**
- ✅ **Manual Verification ผ่านครบ:** Account A baseline/persistence, Account A↔B RLS isolation, Guest behavior/protection, Database verification, Cross-session/cross-device persistence, Auth regression.
- ✅ Member Personalization V1 (Sessions 21–25) ผ่าน Integration Verification ครบแล้ว

**Session 24 (Meditation Practice Log):**
- ✅ **Completed / Manually Verified**
- ✅ สร้าง Service `src/services/meditationSession.ts` สำหรับ CRUD (บันทึก, อ่าน, ลบ ประวัติ)
- ✅ สร้างหน้า `/practice` ใช้ฟอร์ม Inline (datetime-local) ควบคู่กับประวัติการปฏิบัติ
- ✅ จัดการ Timezone จาก Browser (Local) กลับเป็น UTC ใน Supabase อย่างปลอดภัย
- ✅ เพิ่ม Validation (duration > 0, วันที่ถูกต้อง) และใช้ RLS ควบคุมสิทธิ์
- ✅ **Manual Verification ผ่านครบ:** สร้าง/ลบสำเร็จ, Timezone ถูกต้อง, Guest behavior ถูกต้อง, และแก้ไข Bug Local State sorting (รายการใหม่เรียงตาม practiced_at DESC เสมอ) สำเร็จแล้ว

**Session 23 (Learning Activity / Continue Learning / History):**
- ✅ **Completed / Manually Verified**
- ✅ พัฒนา `src/services/learningActivity.ts` เพื่อจัดการ Track Activity และ History โดยจัดการ race condition ผ่าน Unique Constraint อย่างปลอดภัย
- ✅ อัปเดต `VideoPlayer` และ `TopicDetailPage` เพื่อ Track เมื่อผู้ใช้เปิดเนื้อหา
- ✅ สร้าง `ContinueLearningSection` ใน `HomePage` ที่แสดงผลเนื้อหาสูงสุด 2 รายการล่าสุด (รองรับกรณี local data หายไป)
- ✅ สร้างหน้า `/history` สำหรับแสดงประวัติการเข้าชมทั้งหมด
- ✅ **Manual Verification ผ่านครบ:** Topic Tracking, repeated Topic update, Video Tracking, Continue Learning, Learning History และ Guest Behavior

**Session 22 (Saved Content):**
- ✅ **Completed / Manually Verified**
- ✅ พัฒนา Frontend data-access/helper (`getSavedContent`, `saveContent`, `unsaveContent`)
- ✅ สร้าง `SavedContentContext` และ `SaveButton` (รองรับ Guest Redirect)
- ✅ สร้าง `/saved` แสดงเนื้อหาที่บันทึกไว้ เรียงตาม `created_at` DESC
- ✅ **Manual Verification ผ่านครบ:** Save/Unsave, แสดงผล, Guest Behavior, และ RLS
- 🚧 **ปัญหาที่พบระหว่างตรวจสอบ:** `permission denied for table user_saved_content` (PostgreSQL error 42501)
  - **สาเหตุ:** ขาดสิทธิ์ระดับตารางสำหรับ role `authenticated`
  - **การแก้ไข:** รัน `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE ... TO authenticated;` บนทั้ง 3 ตาราง
  - **อัปเดต:** เพิ่มคำสั่ง GRANT ลงใน `database/01_member_personalization.sql` เพื่อให้สอดคล้องกับ Database จริง

**Session 21 (Member Personalization Database Schema + RLS):**
- ✅ **Completed / Database Executed & Manually Verified**
- ✅ สร้างไฟล์ SQL `database/01_member_personalization.sql` 
- ✅ ผลการตรวจสอบบน Supabase:
  - 3 Tables verified (user_saved_content, user_learning_activity, meditation_sessions)
  - RLS enabled = true ทั้ง 3 Tables
  - 12 Policies verified (SELECT/INSERT/UPDATE/DELETE ต่อตาราง)
  - Policies restricted to `authenticated` role อย่างถูกต้อง

**Session 20 (Member Personalization Features Planning):**
- ✅ Member Personalization Requirements ได้รับการอนุมัติแล้ว (เพิ่มลงใน `YudNing.md`)
- ✅ Architecture/Data Model Planning ได้ดำเนินการใน Session นี้
- 🚧 Implementation NOT STARTED (ยังไม่เริ่ม)
- 🚧 LINE Login: IN PROGRESS — OAuth callback/profile retrieval issue (ยังคงสถานะเดิม)

**Session 14 (Version 1.2 — Authentication UI):**
- ✅ สร้าง `src/pages/LoginPage.tsx` — หน้า Login พร้อม:
  - Google OAuth button (Sign in with Google)
  - Email / Password Sign In
  - Email / Password Sign Up (mode toggle)
  - Loading State (Spinner)
  - Error Message ที่เข้าใจง่าย (Thai-friendly messages)
  - Success Message เมื่อสมัครสมาชิก (แจ้งยืนยันอีเมล)
  - Redirect ไป `/` อัตโนมัติเมื่อ login แล้ว
  - Link กลับหน้าแรก
- ✅ สร้าง `src/components/common/ProtectedRoute.tsx` — Guard component:
  - Loading spinner ระหว่างตรวจ session
  - Redirect ไป `/login` เมื่อไม่มี session
  - Render children เมื่อมี session
  - เก็บ `from` location state สำหรับ future redirect-back
- ✅ อัปเดต `src/App.tsx` — เพิ่ม `/login` route:
  - ทำงานถูกต้องกับ HashRouter และ GitHub Pages
  - เพิ่ม `id="main-content"` ให้ `<main>` (Accessibility)
- ✅ อัปเดต `src/components/layout/Header.tsx` — Auth State:
  - Loading: แสดง skeleton placeholder (ไม่ให้ layout กระโดด)
  - Not logged in: แสดงปุ่ม "เข้าสู่ระบบ" (Desktop + Mobile)
  - Logged in: แสดง Avatar + ชื่อผู้ใช้ + dropdown menu พร้อม Logout
  - UserMenu: แสดงอีเมล + ชื่อ, ปุ่ม "ออกจากระบบ"
  - Mobile: แสดง user info + ปุ่ม Logout ใน hamburger menu
- ✅ รัน `npm run build` — **0 TypeScript errors, 0 build errors** (ยืนยัน)

**หมายเหตุ:** ProtectedRoute ยังไม่ได้ครอบหน้าใดๆ — สร้างโครงสร้างไว้พร้อมใช้

**Manual Verification ที่ยืนยันแล้วหลัง Session 14:**
- ✅ Google OAuth Login
- ✅ Google Logout
- ✅ Google Header Auth State
- ✅ Email/Password Sign Up
- ✅ Supabase ส่ง Confirmation Email ได้
- ✅ ผู้ใช้กดยืนยันอีเมลสำเร็จ
- ✅ Email/Password Sign In หลังยืนยันอีเมล
- ✅ Email Header Auth State
- ✅ Redirect หลัง Sign In กลับหน้าแรก
- ⚠໸ Email Confirmation Redirect — ตกไปหน้า 404 (แก้ใน Session 15)

**Session 15 (Email Confirmation Redirect Fix):**
- ✅ วิเคราะห์ root cause: `emailRedirectTo: window.location.origin` นำผู้ใช้ไปที่ URL ที่ไม่มี hash route → HashRouter ไม่รู้ route → 404
- ✅ สร้าง `src/pages/AuthCallbackPage.tsx` — หน้ารับ callback ด้วย `verifyOtp()` (ยังมีอยู่ใน Codebase แต่ไม่ใช่ Final Active Flow)
- ✅ อัปเดต `src/App.tsx` — เพิ่ม `/auth/callback` route (ยังมีอยู่ใน Codebase)
- ✅ แก้ `src/contexts/AuthContext.tsx` — เปลี่ยน `emailRedirectTo`:
  - ก่อน: `window.location.origin` → เกิด 404
  - **Final**: `` `${window.location.origin}${window.location.pathname}` `` (application root) → Supabase SDK ตรวจ token อัตโนมัติ
  - Session ถูกสร้างโดย Supabase SDK ผ่าน `onAuthStateChange` — ไม่ผ่าน `AuthCallbackPage`
- ✅ รัน `npm run build` — **0 TypeScript errors, 0 build errors** (ยืนยัน)
- ✅ Google OAuth code ไม่ถูกเปลี่ยน

**Session 16 (Login Page Branding Preview):**
- ✅ เปลี่ยนโลโก้ใน `LoginPage.tsx` เป็น `src/assets/branding/yudning-logo-main.png` (ปรับให้ชื่อไฟล์ถูกต้องเนื่องจากเดิมเป็น `.png.png`)
- ✅ ปรับขนาดโลโก้เป็น `h-16 w-auto object-contain`
- ✅ นำไอคอน `Leaf` เดิมออกจาก imports
- ✅ รัน `npm run build` — **0 TypeScript errors, 0 build errors** (ยืนยัน)

**Session 17 (Branding Cleanup):**
- ✅ `src/components/layout/Footer.tsx`: เปลี่ยนไอคอน `Leaf` เดิมเป็นโลโก้ `yudning-logo-main.png` (ปรับขนาด `w-9 h-9`) และลบการนำเข้า `Leaf` จาก `lucide-react` ออก
- ✅ `src/pages/NotFoundPage.tsx`: เปลี่ยนกราฟิก Emoji ใบไม้ (`🍃`) เป็นโลโก้ `yudning-logo-main.png` (ปรับขนาด `w-20 h-20`)
- ✅ รัน `npm run build` — **0 TypeScript errors, 0 build errors** (ยืนยัน Session 17)

**Session 18 (Blue/Cyan Theme Migration Closure):**
- ✅ Blue/Cyan Theme Migration เสร็จสมบูรณ์
- ✅ Design Tokens ใน `src/styles/global.css` และ `tailwind.config.js` ตรงกันแล้ว
- ✅ `YudNing.md` และ `PROJECT_STATUS.md` ได้รับการอัปเดตให้ตรงกับ Theme ปัจจุบัน
- ✅ รัน `npm run build` — **0 TypeScript errors, 0 build errors** (ยืนยัน Session 18)
  - Vite v5.4.21 — 1657 modules transformed — built in 3.71s
  - chunk size warning (>500 kB) ไม่ถือเป็น blocker

---

## Next Action

**Mobile Responsive & Internationalization (Planned Work / Roadmap):**
1. Mobile Responsive Audit — COMPLETED
2. Mobile Responsive Implementation Phase 1 — COMPLETED / Manual Verified
3. Mobile Responsive Implementation Phase 2 (Small-Screen Visual Polish) — COMPLETED / Manual Verified
   - **CTA Wrapping:** เพิ่ม `whitespace-nowrap` และปรับ responsive padding/font-size ป้องกันคำขาด (orphan word)
   - **Learning Cards Layout:** ปรับ responsive Padding, Gap, และขนาดย่อ Number Badge ลงในหน้าจอ 320px เพื่อเพิ่มพื้นที่ข้อความ
   - **Mobile Typography:** ปรับขนาด Font (`text-[15px]`, `text-[26px]`, `text-[13px]`) ให้สมดุลและอ่านง่ายขึ้นบนหน้าจอขนาดเล็ก
   - **Vertical Spacing:** ปรับลด Spacing (`py`) ระหว่าง Section ต่างๆ ของ HomePage เฉพาะจอเล็ก เพื่อให้ดูไม่หลวมจนเกินไป
   - **Text Wrapping Fine-tuning:** จัดระเบียบการตัดบรรทัดเฉพาะ Mobile ด้วย `span class="block sm:inline"` ในหน้า FAQ เพื่อความสวยงามโดยไม่กระทบ Desktop
4. TH/EN Internationalization Architecture Audit — PLANNED
5. TH/EN Implementation — PLANNED
6. TH/EN Manual Verification — PLANNED

**Member Personalization Implementation:**
1. ✅ นำไฟล์ `database/01_member_personalization.sql` ไปรันและตรวจสอบผล (Session 21 เสร็จสมบูรณ์)
2. ✅ **Session 22 — Saved Content (เสร็จสมบูรณ์ / ตรวจสอบแล้ว):**
   - พัฒนา Frontend data-access/helper เรียบร้อย
   - เพิ่มฟังก์ชัน Save / Unsave content เรียบร้อย
   - สร้าง UI ให้ Member ดู Saved Content ของตนเองได้ (`/saved`)
   - เพิ่ม Logic กรณี Guest (แจ้งให้เข้าสู่ระบบ ไม่บันทึกข้อมูล)
   - เพิ่มคำสั่ง GRANT บน Database เพื่อแก้ไขปัญหา permission denied สำหรับ role authenticated
3. ✅ **Session 23 — Learning Activity / Continue Learning / History (Completed / Manually Verified)**
4. ✅ **Session 24 — Meditation Practice Log (Completed / Manually Verified)**
5. ✅ **Session 25 — Member Personalization Integration Verification (Completed / Manually Verified)**

**LINE Login (IN PROGRESS — Session 19):**
1. ตรวจสอบ/สร้าง Supabase custom provider ให้เป็น `provider_type = oauth2` อย่างชัดเจน
   - พิจารณาใช้ Supabase Admin API เพื่อสร้าง provider แทน Dashboard UI
   - Dashboard UI อาจ default เป็น OIDC และบังคับ Issuer/JWKS ซึ่งอาจเป็นต้นเหตุ
2. ทดสอบ LINE Login ใหม่หลังแก้ไข provider configuration
3. ยืนยันว่า Supabase Authentication > Users มี LINE user ปรากฏ
4. ยืนยันว่า YudNing ได้ active session และ Header เปลี่ยนเป็นสถานะ logged in
5. ทดสอบ logout/login ซ้ำ
6. เมื่อผ่านทั้งหมดจึงเปลี่ยน LINE Login เป็น Complete

**Content:**
- **ข้อมูลจริง:** ทยอยเพิ่มข้อมูลวิดีโอจริงจากช่อง "ธรรมะ โฆษก" และเปลี่ยนสถานะเป็น `verified`

---

## Blockers

1. **ข้อมูลจริง:** Topics 5/15 เป็น `draft`, 10/15 เป็น `placeholder` — ยังไม่มี topic ที่ `verified` เลย
2. **[LINE Login — ACTIVE]** Error หลัง LINE OAuth callback:
   - `error=server_error`, `error_code=unexpected_failure`
   - `error_description=Error getting user profile from external provider`
   - Root cause ที่สงสัย: Supabase Custom Provider ถูก config เป็น OIDC (ต้องการ Issuer/JWKS) แต่ LINE endpoint เป็น OAuth2
   - แนวทางถัดไป: ลอง create provider ผ่าน Supabase Admin API ด้วย `type: oauth2`

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
| **Auth & Database** | **Supabase Auth + Supabase PostgreSQL** |
| Auth Methods | Google OAuth, Email/Password, LINE (IN PROGRESS — OAuth callback/profile retrieval issue) |

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
├── .env.local             <- [NEW] Supabase env vars — ถูก ignore โดย .gitignore
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json     <- แก้ไขแล้ว (composite:true, ลบ noEmit)
├── index.html
├── PROMPTS.md             <- Workflow instructions สำหรับ AI
├── YudNing.md             <- Project Specification (Source of Truth)
├── PROJECT_STATUS.md      <- เอกสารนี้ (อัปเดททุกครั้งที่ทำงาน)
├── line-webhook/          <- LINE OA Webhook Backend (แยกจาก Frontend)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json        <- Vercel Serverless config
│   ├── .vercel/           <- Vercel project config (มี projectId จริง)
│   ├── .env               <- Environment Variables (LINE Channel Secret & Token)
│   ├── .env.example
│   ├── api/
│   │   └── index.ts       <- Vercel Serverless entry point
│   └── src/
│       ├── app.ts         <- Express app (GET /health, POST /webhook)
│       ├── server.ts      <- Local dev server
│       ├── config/        <- LINE SDK config (lineClient, lineMiddleware)
│       └── handlers/
│           └── messageHandler.ts <- Event handler (Text Echo Reply)
└── src/
    ├── App.tsx             <- Routing หลัก (HashRouter + ErrorBoundary)
    ├── main.tsx            <- [UPDATED] ครอบด้วย AuthProvider แล้ว
    ├── vite-env.d.ts       <- [NEW] TypeScript types สำหรับ Vite env vars
    ├── lib/
    │   └── supabase.ts     <- [NEW] Supabase client (anon key เท่านั้น)
    ├── contexts/
    │   └── AuthContext.tsx  <- [NEW] AuthProvider + useAuth hook
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      [UPDATED — Session 14: เพิ่ม Auth State]
    │   │   ├── Footer.tsx      [DONE]
    │   │   └── DevBanner.tsx   [DONE]
    │   ├── common/
    │   │   ├── StatusBadge.tsx [DONE]
    │   │   ├── EmptyState.tsx  [DONE]
    │   │   ├── ErrorBoundary.tsx [DONE]
    │   │   └── ProtectedRoute.tsx [NEW — Session 14]
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
    │   ├── NotFoundPage.tsx    [DONE]
    │   ├── LoginPage.tsx       [NEW — Session 14]
    │   └── AuthCallbackPage.tsx [NEW — Session 15] รับ Supabase Email Confirmation callback
    ├── data/
    │   ├── topics.ts       [DONE] (15 topics: 5 draft, 10 placeholder)
    │   ├── videos.ts       [PARTIAL] มีวิดีโอจริง 1 รายการ ('vid-01') + 5 timestamps
    │   ├── categories.ts   [DONE]
    │   └── faq.ts          [DONE] (FAQ + LearningPaths)
    ├── hooks/
    │   ├── useSearch.ts    [DONE]
    │   └── usePageSEO.ts   [DONE]
    ├── types/
    │   ├── topic.ts        [DONE]
    │   ├── video.ts        [DONE]
    │   ├── category.ts     [DONE]
    │   └── auth.ts         [NEW] User, Session, AuthContextValue types
    ├── utils/
    │   ├── search.ts      [DONE]
    │   ├── formatDuration.ts [DONE]
    │   └── slugify.ts      [DONE]
    └── styles/
        ├── global.css      [DONE]
        └── variables.css   [DONE]
└── database/               <- [NEW] Directory สำหรับจัดเก็บ SQL scripts
    └── 01_member_personalization.sql <- [NEW] Session 21 Schema + RLS + Session 22 Table Grants
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

### Phase 6: Deployment — เสร็จสมบูรณ์ ✅
- [x] สร้าง GitHub Repository (`Jakra1601/YudNing`)
- [x] Deploy บน GitHub Pages สำเร็จแล้ว
- [x] ตรวจสอบลิงก์ทั้งหมด
- [x] ตรวจสอบ mobile จริง
- [x] ตรวจสอบ meta & social preview

### Phase 7: Authentication (ดำเนินการอยู่)

**Session 13 — Supabase Auth Foundation:**
- [x] ติดตั้ง `@supabase/supabase-js`
- [x] สร้าง `.env.local` — Supabase env vars (ถูก ignore โดย `.gitignore`)
- [x] สร้าง `src/vite-env.d.ts` — TypeScript types สำหรับ Vite env vars
- [x] สร้าง `src/lib/supabase.ts` — Supabase client (anon key เท่านั้น)
- [x] สร้าง `src/types/auth.ts` — TypeScript types สำหรับ Auth
- [x] สร้าง `src/contexts/AuthContext.tsx` — AuthProvider + useAuth hook
- [x] อัปเดต `src/main.tsx` — ครอบ App ด้วย `<AuthProvider>`

**Session 14 — Version 1.2 Authentication UI:**
- [x] สร้าง `src/pages/LoginPage.tsx` — หน้า Login (Google OAuth + Email/Password)
- [x] สร้าง `src/components/common/ProtectedRoute.tsx` — Guard component พร้อมใช้
- [x] อัปเดต `src/App.tsx` — เพิ่ม `/login` route (HashRouter compatible)
- [x] อัปเดต `src/components/layout/Header.tsx` — Auth State (Login button / User dropdown)
- [x] `npm run build` ผ่าน — 0 TypeScript errors

**Session 15 — Email Confirmation Redirect Fix:**
- [x] วิเคราะห์ root cause: `emailRedirectTo: window.location.origin` → URL ไม่มี hash route → 404
- [x] สร้าง `src/pages/AuthCallbackPage.tsx` — รับ callback ด้วย `verifyOtp()` (ยังมีอยู่ใน Codebase แต่ไม่ใช่ Final Active Flow)
- [x] อัปเดต `src/App.tsx` — เพิ่ม `/auth/callback` route (ยังมีอยู่ใน Codebase)
- [x] แก้ `src/contexts/AuthContext.tsx` — `emailRedirectTo` เปลี่ยนเป็น `` `${window.location.origin}${window.location.pathname}` `` (application root)
  - Session ถูกสร้างโดย Supabase SDK ผ่าน `onAuthStateChange` — ไม่ผ่าน `AuthCallbackPage`
- [x] `npm run build` ผ่าน — 0 TypeScript errors (Session 15)
- [x] Manual Verify — ยืนยันสำเร็จ (Session 18): Supabase ยืนยันอีเมลและ redirect กลับ YudNing, SDK สร้าง session อัตโนมัติ, ผู้ใช้เข้าสู่ระบบอัตโนมัติ, Header Auth State เปลี่ยนเป็น Logged In สำเร็จ, ไม่ตกหน้า 404

**Session 16 — Login Page Branding Preview:**
- [x] แสดง Preview โลโก้ใหม่ในหน้า LoginPage (`yudning-logo-main.png`)
- [x] `npm run build` ผ่าน — 0 TypeScript errors (Session 16)

**Session 17 — Branding Cleanup (Footer & 404):**
- [x] นำโลโก้แบรนด์ `yudning-logo-main.png` ไปแทนที่ `Leaf` ใน Footer
- [x] นำโลโก้แบรนด์ `yudning-logo-main.png` ไปแทนที่ Emoji 🍃 ในหน้า NotFoundPage (404)
- [x] `npm run build` ผ่าน — 0 TypeScript errors (Session 17)

**Session 18 — Blue/Cyan Theme Migration Closure:**
- [x] Blue/Cyan Theme Migration เสร็จสมบูรณ์
- [x] Design Tokens ใน `src/styles/global.css` และ `tailwind.config.js` ตรงกันแล้ว
- [x] `YudNing.md` และ `PROJECT_STATUS.md` ได้รับการอัปเดตให้ตรงกับ Theme ปัจจุบัน
- [x] `npm run build` ผ่าน — 0 TypeScript errors, 0 build errors (Session 18)

**Session 19 — LINE Login Integration (IN PROGRESS):**

> **สถานะ:** IN PROGRESS — OAuth callback/profile retrieval issue
> ยังไม่ถือว่าสำเร็จ จนกว่าจะผ่าน Manual Verification ครบถ้วน

_LINE Login Channel & Supabase Provider Setup:_
- [x] สร้าง LINE Login Channel ชื่อ YudNing บน LINE Developers Console
  - Region: Thailand, Web app enabled
  - Channel Status: Developing
- [x] สร้าง Supabase Custom Auth Provider
  - Provider Identifier: `custom:line`
  - Scopes: `openid profile`
  - Allow users without email: เปิดใช้งาน
  - Callback URL ฝั่ง LINE: ตั้งเป็น Supabase Auth callback URL
  - Client ID / Client Secret: ตั้งค่าผ่าน Supabase Dashboard (ห้ามบันทึกค่าจริงในเอกสาร)
- [x] LINE OIDC/OAuth endpoints ที่ยืนยันแล้ว:
  - Authorization: `https://access.line.me/oauth2/v2.1/authorize`
  - Token: `https://api.line.me/oauth2/v2.1/token`
  - UserInfo: `https://api.line.me/oauth2/v2.1/userinfo`

_Frontend Code Changes (Build ผ่าน ✅):_
- [x] เพิ่ม `signInWithLine` ใน `src/types/auth.ts` (`AuthActions` interface)
- [x] เพิ่มฟังก์ชัน `signInWithLine()` ใน `src/contexts/AuthContext.tsx`
  - ใช้ `supabase.auth.signInWithOAuth({ provider: 'custom:line' })`
  - `'custom:line'` เป็น type-safe literal ตาม `Provider = ... | \`custom:\${string}\`` ใน auth-js v2.x
  - `redirectTo`: `${window.location.origin}${window.location.pathname}`
- [x] เพิ่มปุ่ม "เข้าสู่ระบบด้วย LINE" ใน `src/pages/LoginPage.tsx`
  - LINE green button (`#06C755`) พร้อม inline SVG logo
  - `isLineLoading` state แยกเป็นอิสระจาก Google
  - Error handling ผ่าน `getErrorMessage()` และ `errorMsg` state เดิม
- [x] User แก้ไข Google icon เป็น Google G SVG แบบ Multicolor
- [x] `npm run build` ผ่าน — 0 TypeScript errors, 0 build errors
  - Vite v5.4.21, 1657 modules transformed
  - chunk size warning (>500 kB) ไม่ถือเป็น blocker (เป็น warning เดิม)

_Manual Verification Results:_
- [x] YudNing → Supabase → LINE Login page: **PASS**
- [x] LINE authentication (กด Authorize): **PASS**
- [x] Redirect กลับจาก LINE: **เกิดขึ้น แต่มี error**
- [ ] Supabase session creation: **NOT CONFIRMED / FAILED**
- [ ] Header แสดงสถานะ Logged In: **ไม่เกิด** (ตก NotFoundPage)
- [ ] Supabase Authentication > Users มี LINE user: **ยังไม่ยืนยัน**

_Error ที่พบ:_
```
error=server_error
error_code=unexpected_failure
error_description=Error getting user profile from external provider
URL: http://localhost:5173/YudNing/?error=server_error&error_code=unexpected_failure...
```

_สถานการณ์ปัจจุบัน:_
- Supabase Dashboard UI แสดง/บังคับ Issuer URL และ JWKS URI (ลักษณะ OIDC)
- LINE OAuth2 UserInfo endpoint อาจไม่ตรงกับที่ Supabase OIDC Provider คาดหวัง
- การสร้าง provider แบบ `oauth2` ผ่าน Supabase Admin API เป็นแนวทาง investigation ถัดไป

---

## สิ่งที่ต้องทำต่อ (เรียงตามลำดับความสำคัญ)

### ลำดับความสำคัญสูง (Content & Data)

1. **เปลี่ยนสถานะข้อมูลเป็น Verified**
   - ตรวจสอบข้อมูลวิดีโอ (vid-01) และเปลี่ยนสถานะจาก `draft` เป็น `verified` (รอคำสั่ง)

2. **ใส่ข้อมูลจริงใน `topics.ts` และ `videos.ts` เพิ่มเติม**
   - ทยอยเพิ่มข้อมูลวิดีโอจากช่อง "ธรรมะ โฆษก" จนครอบคลุมทุกหัวข้อ

### ลำดับความสำคัญต่ำ

3. **Version 1.1 Features** (ดูใน `YudNing.md` → Version 1.1 Features)
   - Learn Page Progress (localStorage)
   - Continue Learning

---

## LINE OA Webhook Backend

| รายการ | รายละเอียด |
|--------|----------|
| ที่ตั้ง | `line-webhook/` (แยกจาก React Frontend) |
| Runtime | Node.js + Express + TypeScript |
| SDK | `@line/bot-sdk` v9 |
| Hosting | Vercel Serverless Functions |
| Vercel Project ID | `prj_1VwyDQPhZOewoVJI8MQLy8XNUcG0` |
| สถานะ Deploy | ✅ สำเร็จ (Vercel) |
| Webhook Verify | ✅ Success (เปิด Use webhook แล้ว) |
| Endpoints | `GET /health` (ตอบกลับ `ok`), `POST /webhook` |
| Current Capability | Echo Reply สำหรับ Text Message (ทดสอบใช้งานจริงสำเร็จแล้ว) |

> **หมายเหตุ:** LINE OA Webhook เป็นระบบแยกจาก Frontend และ Authentication — ไม่เกี่ยวข้องกัน

---

## Data Status — สถานะข้อมูลปัจจุบัน

### Topics (15 รายการ) — ยืนยันจาก Codebase Session 9

| ID | Slug | Title | Status |
|----|------|-------|--------|
| topic-01 | what-is-meditation | สมาธิคืออะไร | **placeholder** |
| topic-02 | how-to-start | เริ่มนั่งสมาธิอย่างไร | **draft** |
| topic-03 | sitting-posture | ท่านั่งสมาธิสำหรับผู้เริ่มต้น | **draft** |
| topic-04 | body-relaxation | วิธีผ่อนคลายร่างกายก่อนนั่ง | **draft** |
| topic-05 | how-to-place-mind | วิธีวางใจเบื้องต้น | **draft** |
| topic-06 | drowsy-during-meditation | นั่งสมาธิแล้วง่วง ควรทำอย่างไร | **placeholder** |
| topic-07 | restless-mind | ใจฟุ้งซ่าน ควรทำอย่างไร | **placeholder** |
| topic-08 | leg-pain | นั่งแล้วปวดขา ควรทำอย่างไร | **placeholder** |
| topic-09 | cannot-visualize | นึกภาพไม่ออก ทำอย่างไร | **draft** |
| topic-10 | how-long-to-meditate | ควรนั่งสมาธิกี่นาที | **placeholder** |
| topic-11 | meditation-before-sleep | นั่งสมาธิก่อนนอนได้ไหม | **placeholder** |
| topic-12 | no-expectations | ไม่ควรคาดหวังผลอย่างไร | **placeholder** |
| topic-13 | consistent-practice | ฝึกสมาธิให้ต่อเนื่องได้อย่างไร | **placeholder** |
| topic-14 | maintaining-mind-daily | วิธีรักษาใจระหว่างวัน | **placeholder** |
| topic-15 | seeing-light | เห็นแสงขณะนั่งสมาธิ หมายความว่าอะไร | **draft** |

**สรุป:** 5 draft, 10 placeholder, 0 verified

### Videos
- **สถานะ:** มีวิดีโอจริง 2 รายการ
  - `vid-01`: "ฝึกหยุดใจให้ได้ทุกสภาพอากาศ" — YouTube ID: `5MG92_nCOd4`, มี 5 timestamps, สถานะ: `draft`
  - `vid-02`: "ธรรมะเป็นสิ่งที่ทุกคนเข้าถึงได้ : นำนั่งสมาธิ หลวงพ่อธัมมชโย" — YouTube ID: `HLchMorP4To`, มี 8 timestamps, สถานะ: `draft`
- `LibraryPage.tsx` แสดง empty state เมื่อไม่มีวิดีโอ

### Learning Paths (3 เส้นทาง ใน `data/faq.ts`)
- **Beginner Path** — topic-01 ถึง topic-08
- **Common Problems Path** — topic-06, 07, 08, 09, 12
- **Deeper Practice Path** — topic-05, 12, 13, 14, 15

---

## Design System Reference

> **Blue/Cyan Theme** — Migration เสร็จสมบูรณ์ Session 18 (2026-08-13)
> ค่าในส่วนนี้คือ **Source of Truth** ปัจจุบัน ตรงกับ `tailwind.config.js` และ `src/styles/global.css`

### CSS Variables (ใน `src/styles/global.css`)

```css
--color-primary:        #2F6FAF;  /* น้ำเงินหม่น — สงบ น่าเชื่อถือ */
--color-primary-hover:  #255D95;
--color-primary-soft:   #E8F2FA;
--color-secondary:      #53B8D1;
--color-accent:         #63D5D0;
--color-background:     #F7F5F0;
--color-surface:        #FFFFFF;
--color-text-main:      #2D3436;
--color-text-muted:     #636E72;
--color-border:         #E3E8EC;
--color-focus-ring:     #4FA7C5;
--color-error:          #A65353;
--color-success:        #477A61;

--radius-card: 12px;
--radius-btn:  8px;
--radius-sm:   6px;

--shadow-card:       0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 16px rgba(0,0,0,0.10);
```

### Tailwind Config Colors (ใน `tailwind.config.js`)

| Token | ค่า |
|-------|-----|
| `primary.DEFAULT` | `#2F6FAF` |
| `primary.hover` | `#255D95` |
| `primary.soft` | `#E8F2FA` |
| `secondary` | `#53B8D1` |
| `accent` | `#63D5D0` |
| `bg-main` | `#F7F5F0` |
| `surface` | `#FFFFFF` |
| `text-main` | `#2D3436` |
| `text-muted` | `#636E72` |
| `border` | `#E3E8EC` |
| `focus-ring` | `#4FA7C5` |
| `error` | `#A65353` |
| `success` | `#477A61` |

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

*เอกสารนี้สร้างเมื่อ 2026-07-15 Session 1 | อัพเดทล่าสุด Session 22 (2026-08-18)*
