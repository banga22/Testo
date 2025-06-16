const { Telegraf } = require('telegraf');
const bot = new Telegraf('7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ'); // Замените на реальный токен

// Обработчик команды /start
bot.command('start', (ctx) => {
    // Отправляем сообщение с кнопкой
    ctx.reply('Заказать услугу:', {
        reply_markup: {
            inline_keyboard: [[{
                text: '📝 Открыть форму заказа',
                web_app: { url: 'https://banga22.github.io/Testo/' }
            }]]
        }
    });
});

// Запуск бота
bot.launch()
    .then(() => console.log('Бот запущен'))
    .catch(err => console.error('Ошибка запуска бота:', err));
