window.onload = function () {
    // 1. Создаем карту анимаций, которая соответствует именам элементов
    const animationMap = {
        'tim': 'img-tim-animation',
        'hola-soy-text': 'hola-soy-text-animation',
        'tim-text': 'tim-text-animation',
        'hola-frontend': 'hola-frontend-animation',
        'frontend-dev-text': 'frontend-dev-text-animation'
    };

    // 2. Получаем все элементы, которые мы хотим анимировать
    const elements = [];
    for (let id in animationMap) {
        const element = document.getElementById(id);
        const top = element.getBoundingClientRect().top + window.pageYOffset;
        elements.push({element, top, animationClass: animationMap[id]});
    }

    // 3. Слушаем событие скролла
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + window.innerHeight; // текущая позиция скролла + высота видимой области экрана

        elements.forEach(({element, top, animationClass}) => {
            if (scrollPosition >= top) {
                // Если текущая позиция скролла больше или равна позиции элемента, добавляем класс анимации
                element.classList.add(animationClass);
            } else {
                // В противном случае, удаляем класс анимации
                // element.classList.remove(animationClass);
            }
        });
    });
}
