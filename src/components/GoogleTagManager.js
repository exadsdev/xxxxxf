import fs from 'fs/promises';
import path from 'path';

export default async function GoogleTagManager() {
  let googleTagId = '';

  try {
    // ดึง Google Tag ID จากไฟล์ settings.json
    const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    const data = await fs.readFile(settingsPath, 'utf8');
    const settings = JSON.parse(data);
    googleTagId = settings.googleTagId || '';
  } catch (error) {
    console.error('Error loading Google Tag ID:', error);
  }

  // ไม่ต้องแสดง UI อะไร เพียงแต่เพิ่มสคริปต์ GTM
  if (!googleTagId) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');`,
        }}
      />
    </>
  );
}
