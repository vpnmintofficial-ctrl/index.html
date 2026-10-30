const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TOKEN = '9276690902:AAHJGUXY6ElHUallH0TsfYZ8hMA6sLMOtNA';
const ADMIN_ID = '8667961334';
const SITE_URL = 'https://mint-nti9.onrender.com';

// Веб-сервер (отдаёт index.html)
const server = http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Ошибка: index.html не найден');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Веб-сервер запущен на порту ${PORT}`);
});

// Telegram бот
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409')) return;
    console.error('Polling error:', error.message);
});

bot.onText(/\/(sek|#)/, (msg) => {
    const chatId = msg.chat.id;
    if (chatId.toString() !== ADMIN_ID) return;

    bot.sendMessage(chatId, 'Нажми на кнопку ниже:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🚀 Перейти на сайт', url: SITE_URL }]
            ]
        }
    });
});

console.log('Бот запущен...');
