const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// --- 1. КНОПКА "ТАК" (Збільшення на ПК) ---
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

// --- 2. КНОПКА "НІ" (Дві різні логіки) ---


// Змінна, щоб знати, чи це телефон
let isTouchDevice = false;

// Слухаємо перший дотик, щоб зрозуміти, що це телефон
window.addEventListener('touchstart', () => {
    isTouchDevice = true;
});


// А) ЛОГІКА ДЛЯ ПК (Працює ТІЛЬКИ якщо це не телефон)
btnNo.addEventListener('mouseover', (e) => {
    // ЯКЩО ЦЕ ТЕЛЕФОН — НІЧОГО НЕ РОБИМО
    if (isTouchDevice) return;

    btnNo.style.position = 'fixed'; 
    btnNo.style.zIndex = '1000';

    const escapeDistance = 150;
    const rect = btnNo.getBoundingClientRect();
    
    let deltaX = (rect.left + rect.width / 2) - e.clientX;
    let deltaY = (rect.top + rect.height / 2) - e.clientY;

    if (deltaX === 0 && deltaY === 0) { deltaX = 1; deltaY = 1; }

    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    deltaX /= length;
    deltaY /= length;

    let newLeft = rect.left + deltaX * escapeDistance;
    let newTop = rect.top + deltaY * escapeDistance;

    if (newLeft < 20) newLeft = 20;
    if (newLeft + rect.width > window.innerWidth - 20) {
        newLeft = window.innerWidth - rect.width - 20;
    }
    if (newTop < 20) newTop = 20;
    if (newTop + rect.height > window.innerHeight - 20) {
        newTop = window.innerHeight - rect.height - 20;
    }

    btnNo.style.left = `${newLeft}px`;
    btnNo.style.top = `${newTop}px`;
});


// Б) ЛОГІКА ДЛЯ ТЕЛЕФОНУ (Простий телепорт)
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Блокуємо, щоб не викликався mouseover
    
    btnNo.style.position = 'fixed';
    
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.random() * (maxX - 20) + 20;
    const randomY = Math.random() * (maxY - 20) + 20;
    
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}, { passive: false });
