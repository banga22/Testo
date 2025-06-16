// Логика галереи работ
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('executorGallery');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (gallery && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            gallery.scrollBy({ left: -200, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', function() {
            gallery.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
    
    // Добавляем обработчик для увеличения изображений галереи при клике
    document.addEventListener('click', function(e) {
        if (e.target.closest('#executorGallery img')) {
            const imgSrc = e.target.src;
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '2000';
            overlay.style.cursor = 'zoom-out';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            
            overlay.appendChild(img);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        }
    });
});
