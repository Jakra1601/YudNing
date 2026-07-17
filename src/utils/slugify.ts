/**
 * แปลงข้อความเป็น URL slug
 * @param text - ข้อความต้นทาง
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
