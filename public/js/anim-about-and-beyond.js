const elements = [];

window.onload = function () {
    // locking in scrolling until the back button is fully emerged
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.getElementById('back-arrow').classList.remove('back-arrow-animation');
        document.getElementById('back-arrow').style.opacity = '1';
    }, 3000);

    const animationGroup = {
        // one element triggers a group of animations
        // 'tim': ['tim', 'hola-soy-text', 'tim-text', 'hola-frontend', 'frontend-dev-text'],
    };

    for (let id in animationGroup) {
        const element = document.getElementById(id);
        const top = element.getBoundingClientRect().top + window.pageYOffset;
        for (let animationClass of animationGroup[id]) {
            elements.push({
                element: document.getElementById(animationClass),
                top,
                animationClass: `${animationClass}-animation`
            });
        }
    }

    // 3. Слушаем событие скролла
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + window.innerHeight; // текущая позиция скролла + высота видимой области экрана
        elements.forEach(({ element, top, animationClass }) => {
            if (scrollPosition >= top) {
                // Если текущая позиция скролла больше или равна позиции элемента, добавляем класс анимации
                element.classList.add(animationClass);
            } else {
                // В противном случае, удаляем класс анимации
                element.classList.remove(animationClass);
            }
        });
    });
}