// Элементы DOM
const modal = document.getElementById('bookingModal');
const openFormBtn = document.getElementById('openFormBtn');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const executorIdInput = document.getElementById('selectedExecutorId');
const executorNameInput = document.getElementById('selectedExecutorName');

// Открытие модального окна
function openModal(executorId = '', executorName = '') {
    executorIdInput.value = executorId;
    executorNameInput.value = executorName;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы
}

// Закрытие модального окна
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Восстанавливаем скролл
    bookingForm.reset();
    formMessage.textContent = '';
}

// Обработчики событий
openFormBtn.addEventListener('click', () => openModal());
closeBtn.addEventListener('click', closeModal);

// Закрытие при клике вне модалки
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

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
    
    const formData = {
        executorId: executorIdInput.value,
        executorName: executorNameInput.value,
        clientName: document.getElementById('clientName').value,
        clientPhone: document.getElementById('clientPhone').value,
        serviceType: document.getElementById('serviceType').value,
        notes: document.getElementById('bookingNotes').value
    };

    // Форматирование сообщения
    const message = `
        🚀 <b>Новая запись!</b>
        👤 <b>Клиент:</b> ${formData.clientName}
        📞 <b>Телефон:</b> ${formData.clientPhone}
        🛠️ <b>Услуга:</b> ${formData.serviceType}
        ${formData.executorName ? `👨‍🔧 <b>Мастер:</b> ${formData.executorName}` : ''}
        ${formData.notes ? `📝 <b>Пожелания:</b>\n${formData.notes}` : ''}
        ⏱️ <i>${new Date().toLocaleString('ru-RU')}</i>
    `;

    // Настройки бота
    const botToken = 'ВАШ_ТОКЕН_БОТА';
    const chatId = formData.executorId || 'ID_ОБЩЕЙ_ГРУППЫ'; // Отправка мастеру или в общий чат

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
            formMessage.textContent = '✅ Запрос успешно отправлен!';
            formMessage.className = 'success';
            
            // Автозакрытие через 2 секунды
            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            formMessage.textContent = '❌ Ошибка: ' + (data.description || 'неизвестная ошибка');
            formMessage.className = 'error';
        }

    } catch (error) {
        console.error('Ошибка:', error);
        formMessage.textContent = '🚫 Ошибка соединения с сервером';
        formMessage.className = 'error';
    }
});
