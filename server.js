const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TOKEN = '9276690902:AAHJGUXY6ElHUallH0TsfYZ8hMA6sLMOtNA';
const ADMIN_ID = '8667961334';
const SITE_URL = 'https://mint-nti9.onrender.com';

// ═══════════════════════════════════════════════════════
// 1. ВЕБ-СЕРВЕР (Чтобы Render не ругался и отдавал сайт)
// ═══════════════════════════════════════════════════════
const server = http.createServer((req, res) => {
    // Отдаем файл index.html при заходе на сайт
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Ошибка сервера: файл index.html не найден.');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

// Render автоматически выдает порт в переменную PORT
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Веб-сервер запущен на порту ${PORT}`);
});

// ═══════════════════════════════════════════════════════
// 2. TELEGRAM БОТ
// ═══════════════════════════════════════════════════════
const bot = new TelegramBot(TOKEN, { polling: true });

// Игнорируем ошибку 409 (если Render перезапускает сервис)
bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409')) return;
    console.error('Polling error:', error.message);
});

// Реагирует на /sek или /#
bot.onText(/\/(sek|#)/, (msg) => {
    const chatId = msg.chat.id;
    
    // Бот отвечает только тебе
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
