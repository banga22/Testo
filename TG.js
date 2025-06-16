const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ'); // Ваш токен

// 1. Команда /start - приветствие и объяснение
bot.command('start', (ctx) => {
    const welcomeText = `👋 Привет, ${ctx.from.first_name}! Я бот сервиса 3D-услуг.\n\n` +
        `✨ *Чем я могу помочь:*\n` +
        `- 🛠️ Найти исполнителя для вашего 3D проекта\n` +
        `- 📝 Оформить заказ через удобную форму\n` +
        `- 📞 Связать вас напрямую с мастером\n\n` +
        `📌 *Как это работает:*\n` +
        `1. Выбираете специалиста из каталога\n` +
        `2. Заполняете форму с описанием задачи\n` +
        `3. Исполнитель связывается с вами в Telegram\n\n` +
        `🚀 Чтобы начать, используйте команду /order или нажмите кнопку ниже!`;

    ctx.replyWithMarkdown(welcomeText, {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.webApp('📝 Открыть форму заказа', 'https://banga22.github.io/Testo/')],
                [Markup.button.callback('👨‍🎨 Список исполнителей', 'show_executors')]
            ]
        }
    });
});

// 2. Команда /order - оформление заказа
bot.command('order', (ctx) => {
    ctx.reply('📝 Для оформления заказа заполните форму:', {
        reply_markup: {
            inline_keyboard: [
                [Markup.button.webApp('📝 Открыть форму заказа', 'https://banga22.github.io/Testo/')]
            ]
        }
    });
});

// 3. Команда /help - помощь
bot.command('help', (ctx) => {
    const helpText = `ℹ️ *Помощь по боту*\n\n` +
        `/start - Начало работы с ботом\n` +
        `/order - Оформить новый заказ\n` +
        `/help - Получить помощь\n` +
        `/executors - Список исполнителей\n\n` +
        `❓ *Частые вопросы:*\n` +
        `- Форма не открывается? Попробуйте обновить страницу\n` +
        `- Не приходит подтверждение? Проверьте спам\n` +
        `- Техподдержка: @support_username`;
    
    ctx.replyWithMarkdown(helpText);
});

// 4. Команда /executors - список исполнителей
bot.command('executors', (ctx) => {
    const executorsText = `👨‍🎨 *Наши исполнители*\n\n` +
        `1. Алексей Иванов - 3D моделирование\n` +
        `   • Специализация: архитектурная визуализация\n` +
        `   • Рейтинг: ⭐⭐⭐⭐⭐\n\n` +
        `2. Мария Петрова - Текстурирование\n` +
        `   • Специализация: PBR материалы\n` +
        `   • Рейтинг: ⭐⭐⭐⭐\n\n` +
        `3. Дмитрий Сидоров - Ретопология\n` +
        `   • Специализация: игровые модели\n` +
        `   • Рейтинг: ⭐⭐⭐⭐⭐\n\n` +
        `Для выбора исполнителя используйте команду /order`;
    
    ctx.replyWithMarkdown(executorsText);
});

// 5. Обработка callback-кнопок
bot.action('show_executors', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithMarkdown(`Выберите категорию исполнителей:`, {
        reply_markup: {
            inline_keyboard: [
                [
                    Markup.button.callback('3D Моделирование', 'category_modeling'),
                    Markup.button.callback('Текстурирование', 'category_texturing')
                ],
                [
                    Markup.button.callback('Анимация', 'category_animation'),
                    Markup.button.callback('Ретопология', 'category_retopology')
                ],
                [Markup.button.webApp('Все исполнители', 'https://banga22.github.io/Testo/executors.html')]
            ]
        }
    });
});

// Обработка выбора категории
bot.action(/category_/, (ctx) => {
    const category = ctx.match[0].split('_')[1];
    const categories = {
        modeling: '3D Моделирование',
        texturing: 'Текстурирование',
        animation: 'Анимация',
        retopology: 'Ретопология'
    };
    
    ctx.answerCbQuery(`Вы выбрали: ${categories[category]}`);
    ctx.reply(`Исполнители в категории "${categories[category]}":\n\n` +
        `1. Исполнитель 1\n` +
        `2. Исполнитель 2\n` +
        `3. Исполнитель 3\n\n` +
        `Для заказа используйте /order`);
});

// Обработка обычных сообщений
bot.on('text', (ctx) => {
    ctx.replyWithMarkdown(`Я не понимаю текстовые команды. Используйте меню или команды:\n` +
        `/start - начать работу\n` +
        `/help - помощь\n` +
        `/order - оформить заказ`);
});

// Запуск бота
bot.launch()
    .then(() => console.log('Бот запущен и работает!'))
    .catch(err => console.error('Ошибка запуска бота:', err));

// Настройка меню бота
bot.telegram.setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'order', description: 'Оформить заказ' },
    { command: 'executors', description: 'Список исполнителей' },
    { command: 'help', description: 'Помощь' }
]);

// Настройка кнопки меню
bot.telegram.setChatMenuButton({
    menu_button: {
        type: 'web_app',
        text: '📝 Форма заказа',
        web_app: { url: 'https://banga22.github.io/Testo/' }
    }
});
