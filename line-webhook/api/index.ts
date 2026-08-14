import app from "../src/app";

/**
 * api/index.ts — Entry Point สำหรับ Vercel Serverless Functions
 *
 * Vercel จะ import ไฟล์นี้และใช้ default export เป็น request handler
 * ทำให้ Express app ทำงานได้บน Vercel โดยไม่ต้อง listen บน port
 */
export default app;
