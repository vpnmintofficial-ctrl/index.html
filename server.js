const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '9276690902:AAEQ8KE12ZBR7G-7D2yuWXxDBGXMxMu-8UQ';
const ADMIN_ID = '8667961334';
const SITE_URL = 'https://mint-nti9.onrender.com';

const bot = new TelegramBot(TOKEN, { polling: true });

// Реагирует на /sek или /#
bot.onText(/\/(sek|#)/, (msg) => {
    const chatId = msg.chat.id;
    
    // Бот отвечает только тебе (если хочешь чтобы всем - удали эту строку)
    if (chatId.toString() !== ADMIN_ID) return;

    bot.sendMessage(chatId, 'Нажми на кнопку ниже, чтобы открыть сайт:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🚀 Перейти на сайт', url: SITE_URL }]
            ]
        }
    });
});

console.log('Бот запущен...');
