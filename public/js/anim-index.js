const elements = [];

window.onload = function () {
    const animationGroup = {
        'tim': ['tim', 'hola-soy-text', 'tim-text', 'hola-frontend', 'frontend-dev-text'],
    };

    for (let id in animationGroup) {
        const element = document.getElementById(id);
        const top = element.getBoundingClientRect().top + window.pageYOffset;
        for (let animatedElement of animationGroup[id]) {
            elements.push({
                element: document.getElementById(animatedElement),
                top,
                animationClass: `${animatedElement}-animation`
            });
        }
    }

    let isScrolling = false;
    let scrollingInterval;
    // 3. Слушаем событие скролла
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + window.innerHeight; // текущая позиция скролла + высота видимой области экрана
        elements.forEach(({ element, top, animationClass }) => {
            if (scrollPosition >= top) {
                // Если текущая позиция скролла больше или равна позиции элемента, добавляем класс анимации
                element.classList.add(animationClass);
                // location.href = '/#hola';
                if (!isScrolling) {
                    // scroll to bottom
                    window.scrollTo(0, top);
                    scrollingInterval = setInterval(() => window.scrollTo(0, top), 1000);
                    isScrolling = true;
                    // block scroll
                    document.body.style.overflow = 'hidden';
                }
                setTimeout(curtainFall, 3000);
            } else {
                // В противном случае, удаляем класс анимации
                // element.classList.remove(animationClass);
            }
        });
    });

    function curtainFall() {
        for (let i in animationGroup) {
            for (let id of animationGroup[i]) {
                console.log(id);
                document.getElementById(id).classList.add(`${id}-animation-rev`);
            }
        }

        setTimeout(() => {
            location.href = '/about-and-beyond';
        }, 1400); // animation length
    }
}