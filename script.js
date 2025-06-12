document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбор данных формы
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        description: document.getElementById('description').value
    };
    
    // Форматирование сообщения для Telegram
    const message = `
        📌 Новая заявка:
        👤 Имя: ${formData.name}
        ✉️ Почта: ${formData.email}
        📱 Телефон: ${formData.phone}
        🛠 Услуга: ${formData.service}
        📝 Описание: ${formData.description}
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
            messageDiv.textContent = '✅ Данные успешно отправлены!';
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
        messageDiv.textContent = '🚫 Произошла ошибка при отправке';
        messageDiv.className = 'error';
    });
});
