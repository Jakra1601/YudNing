import "dotenv/config";
import { Client, middleware, MiddlewareConfig } from "@line/bot-sdk";

/**
 * ตรวจสอบ Environment Variables ตอน startup
 * ถ้าไม่มีค่า ให้หยุดทำงานทันทีพร้อมแจ้งเตือน
 */
const channelSecret = process.env.LINE_CHANNEL_SECRET;
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

if (!channelSecret || !channelAccessToken) {
  const missing: string[] = [];
  if (!channelSecret) missing.push("LINE_CHANNEL_SECRET");
  if (!channelAccessToken) missing.push("LINE_CHANNEL_ACCESS_TOKEN");

  console.error("❌ ข้อผิดพลาด: ไม่พบ Environment Variables ที่จำเป็น:");
  missing.forEach((key) => console.error(`   - ${key}`));
  console.error(
    "\n📋 วิธีแก้ไข:\n" +
      "   1. คัดลอกไฟล์ .env.example เป็น .env\n" +
      "   2. ใส่ค่า Channel Secret และ Channel Access Token จาก LINE Developer Console\n" +
      "   3. รัน server ใหม่อีกครั้ง"
  );
  process.exit(1);
}

const lineConfig: MiddlewareConfig & { channelAccessToken: string } = {
  channelSecret,
  channelAccessToken,
};

/** LINE Bot SDK Client — ใช้สำหรับส่ง reply message */
export const lineClient = new Client(lineConfig);

/** LINE Middleware — ใช้สำหรับ verify signature บน /webhook route */
export const lineMiddleware = middleware(lineConfig);
