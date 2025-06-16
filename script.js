// DOM элементы
const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const tgAlert = document.getElementById('tgAlert');
const tgAlertClose = document.querySelector('.tg-alert-close');
const clientTgInput = document.getElementById('clientTg');
const tgSource = document.getElementById('tgSource');

// Инициализация Telegram WebApp
function initTelegramWebApp() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        
        const user = Telegram.WebApp.initDataUnsafe?.user;
        if (user?.username) {
            clientTgInput.value = `@${user.username}`;
            tgSource.textContent = 'Данные из Telegram';
            tgSource.className = 'tg-source tg-verified';
            return true;
        }
    }
    return false;
}

// Показать предупреждение для не-Telegram пользователей
function showTelegramAlert() {
    if (!initTelegramWebApp()) {
        clientTgInput.readOnly = false;
        clientTgInput.placeholder = "Введите ваш Telegram";
        tgSource.textContent = 'Приложение открыто вне Telegram';
        tgSource.className = 'tg-source tg-external';
        
        // Показываем alert только на мобильных устройствах
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            tgAlert.style.display = 'block';
        }
    }
}

// Открытие модального окна
function openModal(executorId, executorName) {
    document.getElementById('masterId').value = executorId || '';
    document.getElementById('masterName').value = executorName || '';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
    formMessage.textContent = '';
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация при загрузке
    showTelegramAlert();
    
    // Закрытие модалки
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // Закрытие при клике вне модалки
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие Telegram alert
    tgAlertClose.addEventListener('click', () => {
        tgAlert.style.display = 'none';
    });
    
    // Обработка кнопок записи
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.dataset.tgId, btn.dataset.name);
        });
    });
    
    // Отправка формы
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            masterId: document.getElementById('masterId').value,
            masterName: document.getElementById('masterName').value,
            clientName: document.getElementById('clientName').value,
            clientPhone: document.getElementById('clientPhone').value,
            clientTg: clientTgInput.value,
            service: document.getElementById('service').value
        };
        
        // Форматирование сообщения
        const message = `
            🚀 <b>НОВАЯ ЗАПИСЬ</b>
            👤 <b>Клиент:</b> ${formData.clientName}
            📞 <b>Телефон:</b> ${formData.clientPhone}
            ✈️ <b>Telegram:</b> ${formData.clientTg}
            🛠️ <b>Услуга:</b> ${formData.service}
            ${formData.masterName ? `👨‍🔧 <b>Мастер:</b> ${formData.masterName}` : ''}
            ⏱ <i>${new Date().toLocaleString('ru-RU')}</i>
        `;
        
        // Настройки бота (ЗАМЕНИТЕ НА СВОИ!)
        const botToken = 'ВАШ_ТОКЕН_БОТА';
        const chatId = formData.masterId || 'ID_ОБЩЕГО_ЧАТА';
        
        try {
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
                formMessage.textContent = '✅ Запись успешно отправлена!';
                formMessage.className = 'success';
                setTimeout(closeModal, 2000);
            } else {
                formMessage.textContent = `❌ Ошибка: ${data.description || 'неизвестная ошибка'}`;
                formMessage.className = 'error';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            formMessage.textContent = '🚫 Ошибка соединения';
            formMessage.className = 'error';
        }
    });
});

// Для отладки в консоли
console.log('App initialized');
if (window.Telegram?.WebApp) {
    console.log('Telegram WebApp detected:', Telegram.WebApp.initDataUnsafe);
} else {
    console.log('Running in regular browser');
}
