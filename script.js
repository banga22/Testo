// Элементы DOM
const modal = document.getElementById('bookingModal');
const openFormBtn = document.getElementById('openFormBtn');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const executorIdInput = document.getElementById('selectedExecutorId');
const executorNameInput = document.getElementById('selectedExecutorName');
const telegramInput = document.getElementById('clientTelegram');
const telegramSource = document.getElementById('telegramSource');

// Проверяем, открыто ли приложение через Telegram WebApp
function initTelegramAuth() {
    if (window.Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            telegramInput.value = user.username ? `@${user.username}` : 'Не указан';
            telegramSource.textContent = 'Данные получены из Telegram';
            telegramSource.style.color = '#28a745';
            return true;
        }
    }
    
    telegramInput.readOnly = false;
    telegramInput.placeholder = "Введите ваш Telegram";
    telegramSource.textContent = 'Приложение открыто вне Telegram';
    telegramSource.style.color = '#dc3545';
    return false;
}

// Открытие модального окна
function openModal(executorId = '', executorName = '') {
    executorIdInput.value = executorId;
    executorNameInput.value = executorName;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    // Инициализируем данные Telegram
    initTelegramAuth();
}

// Закрытие модального окна
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    bookingForm.reset();
    formMessage.textContent = '';
    telegramSource.textContent = '';
}

// Обработчики событий
openFormBtn.addEventListener('click', () => openModal());
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => e.target === modal && closeModal());

// Обработка кнопок "Записаться" в карточках
document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', () => {
        const executorId = button.getAttribute('data-executor-id');
        const executorName = button.getAttribute('data-executor-name');
        openModal(executorId, executorName);
    });
});

// Отправка формы
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        executorId: executorIdInput.value,
        executorName: executorNameInput.value,
        clientName: document.getElementById('clientName').value,
        clientPhone: document.getElementById('clientPhone').value,
        clientTelegram: telegramInput.value,
        serviceType: document.getElementById('serviceType').value,
        notes: document.getElementById('bookingNotes').value
    };

    // Форматирование сообщения для Telegram
    const message = `
        🚀 <b>НОВАЯ ЗАПИСЬ!</b>
        👤 <b>Клиент:</b> ${formData.clientName}
        📱 <b>Телефон:</b> ${formData.clientPhone}
        ✈️ <b>Telegram:</b> ${formData.clientTelegram}
        🛠️ <b>Услуга:</b> ${formData.serviceType}
        ${formData.executorName ? `👨‍🔧 <b>Мастер:</b> ${formData.executorName}` : ''}
        ${formData.notes ? `📝 <b>Пожелания:</b>\n${formData.notes}` : ''}
        ⏱️ <i>${new Date().toLocaleString('ru-RU')}</i>
    `;

    // Настройки бота (ЗАМЕНИТЕ НА СВОИ!)
    const botToken = '7871514395:AAEKXYC0n8rbfPaWmIuYjstEkf7psDgN1tQ';
    const chatId = formData.executorId || '1257092596'; // Отправляем выбранному мастеру

    try {
        // Отправка в Telegram
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            formMessage.textContent = '✅ Запрос успешно отправлен мастеру!';
            formMessage.className = 'success';
            
            // Автозакрытие через 2 секунды
            setTimeout(closeModal, 2000);
        } else {
            formMessage.textContent = `❌ Ошибка отправки: ${data.description || 'неизвестная ошибка'}`;
            formMessage.className = 'error';
        }

    } catch (error) {
        console.error('Ошибка сети:', error);
        formMessage.textContent = '🚫 Ошибка соединения с сервером';
        formMessage.className = 'error';
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, открыто ли приложение через Telegram
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        
        // Скрываем стандартную кнопку Telegram
        Telegram.WebApp.MainButton.hide();
    }
});
