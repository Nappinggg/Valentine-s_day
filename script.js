const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// 1. Логіка кнопки "Так" (Збільшення)
if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const btnRect = btnYes.getBoundingClientRect();
        const btnX = btnRect.left + btnRect.width / 2;
        const btnY = btnRect.top + btnRect.height / 2;
        const distance = Math.sqrt(Math.pow(x - btnX, 2) + Math.pow(y - btnY, 2));

        const maxDistance = 300; 
        const maxScale = 1.7;    

        if (distance < maxDistance) {
            const scale = 1 + ((maxDistance - distance) / maxDistance) * (maxScale - 1);
            btnYes.style.transform = `scale(${scale})`;
        } else {
            btnYes.style.transform = 'scale(1)';
        }
    });
}

// 2. Логіка кнопки "Ні" (Втеча)
btnNo.addEventListener('mouseover', (e) => {
    // Важливий момент: робимо кнопку "фіксованою", щоб вона літала відносно екрану, а не картки
    btnNo.style.position = 'fixed'; 
    btnNo.style.zIndex = '1000'; // Щоб була поверх усього

    const escapeDistance = 150; // Дистанція відскоку (пікселі)
    const rect = btnNo.getBoundingClientRect();
    
    // Вектор від мишки до центру кнопки
    let deltaX = (rect.left + rect.width / 2) - e.clientX;
    let deltaY = (rect.top + rect.height / 2) - e.clientY;

    // Якщо курсор прямо в центрі (рідко, але буває) -> штовхаємо вправо
    if (deltaX === 0 && deltaY === 0) { 
        deltaX = 1; 
        deltaY = 1; 
    }

    // Нормалізація (робимо вектор довжиною 1)
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    deltaX /= length;
    deltaY /= length;

    // Рахуємо нову позицію
    let newLeft = rect.left + deltaX * escapeDistance;
    let newTop = rect.top + deltaY * escapeDistance;

    // --- ОБМЕЖЕННЯ (Стіни) ---
    // Не даємо вийти за межі екрану (з відступом 20px)
    if (newLeft < 20) newLeft = 20;
    if (newLeft + rect.width > window.innerWidth - 20) {
        newLeft = window.innerWidth - rect.width - 20;
    }
    if (newTop < 20) newTop = 20;
    if (newTop + rect.height > window.innerHeight - 20) {
        newTop = window.innerHeight - rect.height - 20;
    }

    // Застосовуємо
    btnNo.style.left = `${newLeft}px`;
    btnNo.style.top = `${newTop}px`;
});
// --- ВИПРАВЛЕННЯ ДЛЯ ТЕЛЕФОНУ ---
const teleportButton = (e) => {
    e.preventDefault(); // Забороняє зум, скрол і подвійні кліки
    
    // Якщо кнопка ще не "відірвалась" від картки — робимо fixed
    if (btnNo.style.position !== 'fixed') {
        btnNo.style.position = 'fixed';
        btnNo.style.zIndex = '1000'; // Щоб була зверху
    }

    // Рахуємо межі, куди можна стрибнути
    const maxWidth = window.innerWidth - btnNo.offsetWidth - 20;
    const maxHeight = window.innerHeight - btnNo.offsetHeight - 20;
    
    // Нові випадкові координати (від 20px до максимуму)
    const newX = Math.random() * (maxWidth - 20) + 20;
    const newY = Math.random() * (maxHeight - 20) + 20;

    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
};

// Чіпляємо на ВСІ можливі дії з пальцем
btnNo.addEventListener('touchstart', teleportButton, { passive: false });
btnNo.addEventListener('touchmove', teleportButton, { passive: false }); // Додали це
btnNo.addEventListener('touchend', teleportButton, { passive: false });  // І це про всяк випадок
// Клік по "Так"
btnYes.addEventListener('click', () => {
   alert("Ура! Далі буде друга сторінка...");
});


