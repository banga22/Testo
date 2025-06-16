const { Telegraf } = require('telegraf');
const bot = new Telegraf('7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ');

bot.command('start', (ctx) => {
    const command = ctx.message.text.split(' ')[1];
    
    if (command === 'form') {
        ctx.reply('Заполните форму заказа:', {
            reply_markup: {
                inline_keyboard: [[{
                    text: '📝 Открыть форму заказа',
                    web_app: { 
                        url: 'https://banga22.github.io/Testo/' 
                    }
                }]]
            }
        });
    } else {
        ctx.reply(`👋 Привет! Я бот для заказа 3D услуг.\n\n`
                + `Чтобы оформить заказ:\n`
                + `1. Нажмите кнопку меню\n`
                + `2. Выберите "Форма заказа"\n\n`
                + `Или отправьте команду /start form`);
    }
});

// Обработчик для кнопки меню
bot.on('message', (ctx) => {
    if (ctx.message.web_app_data) {
        const data = JSON.parse(ctx.message.web_app_data.data);
        ctx.reply(`✅ Получены данные формы:\nИмя: ${data.name}\nEmail: ${data.email}`);
    }
});

bot.launch();
