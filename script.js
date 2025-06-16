document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, открыто ли приложение в Telegram
    const isTelegram = window.Telegram && Telegram.WebApp;
    const telegramField = document.getElementById('telegram');
    
    if (isTelegram) {
        // Инициализируем WebApp
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        
        // Получаем данные пользователя
        const tgUser = Telegram.WebApp.initDataUnsafe?.user;
        
        if (tgUser) {
            // Заполняем имя
            document.getElementById('name').value = tgUser.first_name || '';
            
            // Заполняем поле Telegram
            if (tgUser.username) {
                telegramField.value = `@${tgUser.username}`;
            } else {
                // Если username отсутствует, используем user ID
                telegramField.value = `user_${tgUser.id}`;
            }
        } else {
            // Если данные пользователя недоступны
            telegramField.value = "Не удалось получить данные";
        }
        
        // Делаем поле нередактируемым и меняем стиль
        telegramField.readOnly = true;
        telegramField.classList.add('telegram-auto');
    } else {
        // Если открыто в обычном браузере
        telegramField.value = "Откройте в Telegram";
        telegramField.readOnly = true;
        telegramField.classList.add('telegram-auto');
    }
});

document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Показываем индикатор загрузки
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    try {
        // Получение данных формы
        const executorSelect = document.getElementById('executor');
        const executorId = executorSelect.value;
        const executorName = executorSelect.options[executorSelect.selectedIndex].text;
        
        // Валидация данных
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const telegram = document.getElementById('telegram').value.trim();
        const service = document.getElementById('service').value;
        const description = document.getElementById('description').value.trim();
        
        // Проверка обязательных полей
        if (!executorId || !name || !email || !phone || !service || !description) {
            showMessage('❌ Заполните все обязательные поля!', 'error', 3000);
            return;
        }
        
        // Форматирование сообщения
        const message = `
🚀 <b>Новый заказ для ${executorName.split(' (')[0]}!</b>

👤 <b>Клиент:</b> ${name}
📧 <b>Почта:</b> ${email}
📱 <b>Телефон:</b> ${phone}
✈️ <b>Telegram:</b> ${telegram}
🛠️ <b>Услуга:</b> ${service}
📝 <b>Описание:</b> 
${description}
⏱️ <i>${new Date().toLocaleString('ru-RU')}</i>
        `;
        
        // Токен бота (учебный)
        const botToken = '7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ';
        
        // Отправка сообщения через Telegram API
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: executorId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            showMessage(`✅ Заявка отправлена ${executorName.split(' (')[0]}!`, 'success', 5000);
            document.getElementById('feedbackForm').reset();
            
            // Закрыть веб-приложение, если открыто в Telegram
            if (window.Telegram && Telegram.WebApp && Telegram.WebApp.close) {
                setTimeout(() => Telegram.WebApp.close(), 2000);
            }
        } else {
            throw new Error(data.description || 'Ошибка отправки сообщения');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showMessage(`🚫 Ошибка: ${error.message || 'Попробуйте позже'}`, 'error', 5000);
    } finally {
        // Восстанавливаем кнопку
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Функция для отображения сообщений
function showMessage(text, className, timeout = 5000) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = className;
    
    if (timeout
