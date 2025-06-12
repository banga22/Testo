document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбор данных формы
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        telegram: document.getElementById('telegram').value,
        service: document.getElementById('service').value,
        description: document.getElementById('description').value
    };
    
    // Проверка Telegram аккаунта
    if (!formData.telegram.startsWith('@')) {
        formData.telegram = '@' + formData.telegram;
    }
    
    // Форматирование сообщения для Telegram
    const message = `
        🚀 <b>Новый заказ!</b>
        
        👤 <b>Имя:</b> ${formData.name}
        📧 <b>Почта:</b> ${formData.email}
        📱 <b>Телефон:</b> ${formData.phone}
        ✈️ <b>Telegram:</b> ${formData.telegram}
        
        🛠️ <b>Услуга:</b> ${formData.service}
        📝 <b>Описание:</b>
        ${formData.description}
        
        ⏱️ <i>${new Date().toLocaleString('ru-RU')}</i>
    `;
    
    // Настройки бота Telegram
    const botToken = '7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ';
    const chatId = '1257092596';
    
    // Отправка данных через Telegram API
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.ok) {
            messageDiv.textContent = '✅ Заявка успешно отправлена! С вами свяжутся в Telegram';
            messageDiv.className = 'success';
            document.getElementById('feedbackForm').reset();
        } else {
            messageDiv.textContent = '❌ Ошибка отправки: ' + data.description;
            messageDiv.className = 'error';
        }
        
        // Автоскрытие сообщения через 5 секунд
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 5000);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = '🚫 Произошла ошибка при отправке заявки';
        messageDiv.className = 'error';
    });
});
