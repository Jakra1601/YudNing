import { WebhookEvent, MessageEvent, TextMessage } from "@line/bot-sdk";
import { lineClient } from "../config/line";

/**
 * ReplyService
 * แยก layer การส่งข้อความออกจาก logic
 * ในอนาคตสามารถเพิ่ม retry, logging, หรือ queue ได้ที่นี่
 */
async function sendReply(replyToken: string, text: string): Promise<void> {
  await lineClient.replyMessage(replyToken, [{ type: "text", text }]);
}

/**
 * MessageService
 * Logic การสร้างข้อความตอบกลับ
 *
 * Version 1: Auto-reply ด้วยข้อความ echo
 *
 * อนาคต: เปลี่ยน layer นี้เพื่อเชื่อมต่อกับ
 * - AI Chat (OpenAI, Gemini)
 * - RAG / Knowledge Base
 * - ค้นหาธรรมะจากคลัง YudNing
 * โดยไม่ต้องแก้ไข Webhook handler หลัก
 */
async function generateReply(userText: string): Promise<string> {
  // TODO: เชื่อมต่อ AI / YudNing Knowledge Base ในอนาคต
  return `คุณพิมพ์ว่า: "${userText}"`;
}

/**
 * handleTextMessage
 * จัดการ Text Message Event
 */
async function handleTextMessage(event: MessageEvent): Promise<void> {
  const message = event.message as TextMessage;
  const userText = message.text;

  const replyText = await generateReply(userText);
  await sendReply(event.replyToken, replyText);
}

/**
 * handleEvent
 * Entry point สำหรับแต่ละ LINE Event
 *
 * Version 1: รองรับเฉพาะ message event ประเภท text
 * Event ประเภทอื่น (image, sticker, follow, postback ฯลฯ) จะถูกข้ามโดยไม่เกิด error
 *
 * NOTE: webhookEventId พร้อมสำหรับ Idempotency check ในอนาคต
 * (event.webhookEventId) — ใช้ตรวจสอบ event ซ้ำก่อนประมวลผล
 */
export async function handleEvent(event: WebhookEvent): Promise<void> {
  try {
    // รองรับเฉพาะ message event
    if (event.type !== "message") {
      return;
    }

    // รองรับเฉพาะ text message
    if (event.message.type !== "text") {
      return;
    }

    await handleTextMessage(event);
  } catch (error) {
    // Log error โดยไม่เปิดเผย secret หรือ token
    const eventType = event.type;
    const eventId =
      "webhookEventId" in event ? event.webhookEventId : "unknown";
    console.error(
      `[ERROR] เกิดข้อผิดพลาดใน event (type=${eventType}, id=${eventId}):`,
      error instanceof Error ? error.message : "Unknown error"
    );
    // ไม่ re-throw เพื่อให้ event อื่นใน batch ยังทำงานได้ปกติ
  }
}
