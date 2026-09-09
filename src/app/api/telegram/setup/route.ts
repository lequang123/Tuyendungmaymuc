import { NextRequest, NextResponse } from 'next/server';
import { setBotCommands } from '@/lib/telegram';

// ============================================================
// Telegram Webhook Setup (call once after deploy)
// ============================================================

export async function GET(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not set' },
      { status: 500 },
    );
  }

  // Derive the webhook URL from the request
  const url = new URL(request.url);
  const webhookUrl = `${url.protocol}//${url.host}/api/telegram/webhook`;

  // Register webhook with Telegram (include callback_query for inline buttons)
  const telegramUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;
  const res = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ['message', 'callback_query'],
    }),
  });

  const webhookData = await res.json();

  // Also register bot commands menu
  await setBotCommands();

  return NextResponse.json({
    webhookUrl,
    telegramResponse: webhookData,
    commandsRegistered: true,
  });
}
