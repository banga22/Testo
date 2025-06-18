// Данные о мастерах
const executorsData = {
    1: {
        name: "Алексей Иванов",
        img: "1.png.png",
        rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><span> 4.8</span>',
        description: "Специалист по 3D моделированию с 7-летним опытом. Работал над проектами для крупных игровых студий. Создаю высокополигональные и низкополигональные модели, оптимизированные для различных платформ.",
        gallery: [
            "./Images/1.jpg",
            "./Images/2.jpg",
            "./Images/3.jpg",
            "./Images/4.jpg"
        ]
    },
    2: {
        name: "Мария Петрова",
        img: "https://via.placeholder.com/200/e67e22/ffffff",
        rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span> 5.0</span>',
        description: "Эксперт по текстурированию и материаловедению. Создаю реалистичные текстуры для любых объектов. Специализируюсь на PBR текстурах, Substance Painter и Photoshop. Работаю как с реалистичными, так и со стилизованными текстурами.",
        gallery: [
            "https://via.placeholder.com/400x300/1abc9c/ffffff?text=Текстура+1",
            "https://via.placeholder.com/400x300/3498db/ffffff?text=Текстура+2",
            "https://via.placeholder.com/400x300/9b59b6/ffffff?text=Текстура+3"
        ]
    },
    3: {
        name: "Дмитрий Сидоров",
        img: "https://via.placeholder.com/200/2ecc71/ffffff",
        rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><span> 4.2</span>',
        description: "Профессионал в области ретопологии и оптимизации 3D моделей. Специализируюсь на подготовке моделей для игр. Работаю с ZBrush, Maya, 3ds Max. Могу оптимизировать любую модель без потери качества.",
        gallery: [
            "https://via.placeholder.com/400x300/1abc9c/ffffff?text=Ретопология+1",
            "https://via.placeholder.com/400x300/3498db/ffffff?text=Ретопология+2",
            "https://via.placeholder.com/400x300/9b59b6/ffffff?text=Ретопология+3",
            "https://via.placeholder.com/400x300/e74c3c/ffffff?text=Ретопология+4",
            "https://via.placeholder.com/400x300/f1c40f/ffffff?text=Ретопология+5"
        ]
    },
    4: {
        name: "Екатерина Волкова",
        img: "https://via.placeholder.com/200/e74c3c/ffffff",
        rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span> 5.0</span>',
        description: "Художник по персонажам и окружению. Создаю уникальные стилизованные модели с нуля. Работаю в различных стилях - от реализма до казуальной стилизации. Участвовала в создании нескольких инди-игр.",
        gallery: [
            "https://via.placeholder.com/400x300/1abc9c/ffffff?text=Персонаж+1",
            "https://via.placeholder.com/400x300/3498db/ffffff?text=Персонаж+2",
            "https://via.placeholder.com/400x300/9b59b6/ffffff?text=Окружение+1",
            "https://via.placeholder.com/400x300/e74c3c/ffffff?text=Окружение+2"
        ]
    }
};

// Открытие модального окна
function openModal(executorId) {
    const modal = document.getElementById('executorModal');
    const executor = executorsData[executorId];
    
    document.getElementById('modalExecutorImg').src = executor.img;
    document.getElementById('modalExecutorImg').alt = executor.name;
    document.getElementById('modalExecutorName').textContent = executor.name;
    document.getElementById('modalExecutorRating').innerHTML = executor.rating;
    document.getElementById('modalExecutorDescription').textContent = executor.description;
    
    // Заполняем галерею
    const gallery = document.getElementById('executorGallery');
    gallery.innerHTML = '';
    executor.gallery.forEach(imgUrl => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = 'Работа ' + executor.name;
        gallery.appendChild(img);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
}

// Закрытие модального окна
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('executorModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку страницы
});

// Закрытие при клике вне модального окна
window.addEventListener('click', function(event) {
    const modal = document.getElementById('executorModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
