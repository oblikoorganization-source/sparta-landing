import { NextRequest, NextResponse } from "next/server";

// Lead gateway: form → (optional obliko API gateway) → Telegram bot.
// Configure via env:
//   LEAD_GATEWAY_URL   — external obliko API gateway (preferred, like obliko.org)
//   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID — direct bot fallback
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const interest = String(body.interest || "").slice(0, 60);
    const name = String(body.name || "").trim().slice(0, 120);
    const phone = String(body.phone || "").trim().slice(0, 120);
    const note = String(body.note || "").trim().slice(0, 1000);

    if (name.length < 2 || phone.length < 3) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
    }

    const text = [
      "🟥 <b>Нова заявка — сайт «SPARTA»</b>",
      interest && `Інтерес: ${interest}`,
      name && `Імʼя: ${name}`,
      phone && `Контакт: ${phone}`,
      note && `Коментар: ${note}`,
    ]
      .filter(Boolean)
      .join("\n");

    // 1) external obliko API gateway, if configured
    const gateway = process.env.LEAD_GATEWAY_URL;
    if (gateway) {
      const r = await fetch(gateway, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source: "sparta", interest, name, phone, note, text }),
      });
      if (!r.ok) throw new Error("gateway_failed");
      return NextResponse.json({ ok: true });
    }

    // 2) direct Telegram bot fallback
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat = process.env.TELEGRAM_CHAT_ID;
    if (token && chat) {
      const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
      });
      if (!tg.ok) throw new Error("tg_failed");
      return NextResponse.json({ ok: true });
    }

    // 3) dev demo — let the UX flow work locally before creds are set
    if (process.env.NODE_ENV !== "production") {
      console.warn("[lead] no LEAD_GATEWAY_URL / TELEGRAM_* set — dev demo OK:\n" + text);
      return NextResponse.json({ ok: true, demo: true });
    }

    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
