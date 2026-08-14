import express, { Request, Response } from "express";
import { WebhookEvent } from "@line/bot-sdk";
import { lineMiddleware } from "./config/line";
import { handleEvent } from "./handlers/messageHandler";

const app = express();

/**
 * GET /health
 * Health check endpoint — ใช้ตรวจสอบว่า server ทำงานปกติ
 */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "line-webhook",
  });
});

/**
 * POST /webhook
 * รับ Webhook จาก LINE Platform
 *
 * ⚠️ สำคัญ: lineMiddleware ต้องมาก่อน express.json() เสมอ
 * เพราะ LINE SDK ต้องอ่าน raw body เพื่อ verify signature
 * ถ้า express.json() parse ไปก่อน body จะเปลี่ยนรูปแบบและ signature จะไม่ผ่าน
 */
app.post(
  "/webhook",
  lineMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const events: WebhookEvent[] = req.body.events;

    // รองรับ LINE Verify Webhook (ส่ง events: [] มาทดสอบ)
    if (!events || events.length === 0) {
      res.status(200).send("OK");
      return;
    }

    // ประมวลผลทุก event พร้อมกัน — แต่ละ event มี try/catch ของตัวเอง
    await Promise.all(events.map((event) => handleEvent(event)));

    res.status(200).send("OK");
  }
);

export default app;
