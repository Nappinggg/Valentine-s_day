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
// --- ДОДАТОК ДЛЯ ТЕЛЕФОНУ (Touch Fix) ---
// Ця функція просто кидає кнопку в рандомне місце (бо "тікати" від пальця складно)
const jumpAround = (e) => {
    // Ці рядки вбивають будь-які спроби натиснути кнопку
    e.preventDefault(); 
    e.stopPropagation();

    // Робимо кнопку "летючою"
    btnNo.style.position = 'fixed';
    
    // Генеруємо випадкові координати (з відступом 20px від країв)
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.random() * (maxX - 20) + 20;
    const randomY = Math.random() * (maxY - 20) + 20;

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
};

// Чіпляємо цю функцію на всі можливі дотики
btnNo.addEventListener('touchstart', jumpAround, { passive: false });
btnNo.addEventListener('touchend', jumpAround, { passive: false });


// Клік по "Так"
btnYes.addEventListener('click', () => {
   alert("Ура! Далі буде друга сторінка...");
});

