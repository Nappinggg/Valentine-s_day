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

        if (distance < 300) {
            const scale = 1 + ((300 - distance) / 300) * (0.7);
            btnYes.style.transform = `scale(${scale})`;
        } else {
            btnYes.style.transform = 'scale(1)';
        }
    });
}

// --- 2. КНОПКА "НІ" (ТІКАЄ) ---

// Функція переміщення
function moveBtn() {
    btnNo.style.position = 'fixed';
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    const newX = Math.random() * (maxX - 20) + 20;
    const newY = Math.random() * (maxY - 20) + 20;
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
}

// На ПК тікає від мишки
btnNo.addEventListener('mouseenter', moveBtn);

// На Телефоні (і ПК) тікає при кліку
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveBtn();
});

// Страховка для тачскрінів
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveBtn();
}, { passive: false });


// --- 3. КНОПКА "ТАК" (ПЕРЕХІД НА 2 СТОРІНКУ) ---
btnYes.addEventListener('click', () => {
    // Ховаємо питання
    document.getElementById('page1').classList.add('hidden');
    // Показуємо книги
    document.getElementById('page2').classList.remove('hidden');

    // Салют!
    if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
});


// --- 4. ЛОГІКА КНИГ ---

// Відкрити книгу
function openBook(id) {
    document.getElementById('page2').classList.add('hidden');
    document.getElementById(`book-content-${id}`).classList.remove('hidden');
}

// Закрити книгу
function closeBook(id) {
    document.getElementById(`book-content-${id}`).classList.add('hidden');
    document.getElementById('page2').classList.remove('hidden');
}

// Активація купона
function activateCoupon() {
    const btn = document.getElementById('activate-btn');
    btn.textContent = "✨ АКТИВОВАНО! ✨";
    btn.style.background = "#ccc";
    btn.disabled = true;
    
    if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 } });
    }
    
    alert("Купон активовано! Чекай на виконання бажання 😏");
}
