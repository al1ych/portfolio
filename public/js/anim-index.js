const elements = [];

window.onload = function () {
    const animationGroup = {
        // one element triggers a group of animations
        'tim': ['tim', 'hola-soy-text', 'tim-text', 'hola-frontend', 'frontend-dev-text'],
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
                // element.classList.remove(animationClass);
            }
        });
    });

    // get absolute Y bottom of div with id 'tim' in the document
    const tim = document.getElementById('tim');
    const timBottom = tim.getBoundingClientRect().bottom + window.pageYOffset;
    console.log("timBottom", timBottom)
    let reachedPageBottom = false;
    let animationFinished = false;
    let wheelListener;
    window.addEventListener('scroll', () => {
        if (animationFinished) {
            return;
        }
        const scrollPosition = window.pageYOffset + window.innerHeight;
        if (scrollPosition >= timBottom - 1) {
            console.log("timBottom reached")
            if (!reachedPageBottom) {
                setTimeout(() => {
                    reachedPageBottom = true;
                    wheelListener = window.addEventListener('wheel', function (event) {
                        if (event.deltaY < 0) {
                            // console.log('Прокрутка вверх', event.deltaY);
                            this.document.getElementById('title').style.opacity = 1;
                            this.document.getElementById('hola').style.opacity = 1;
                            reachedPageBottom = false;
                            window.removeEventListener('wheel', wheelListener);
                        } else if (event.deltaY > 0) {
                            // console.log('Прокрутка вниз', event.deltaY);
                            if (reachedPageBottom) {
                                const oldOpacity = this.document.getElementById('hola').style.opacity || 1;
                                const newOpacity = Math.max(0, oldOpacity - event.deltaY / 3000);
                                this.document.getElementById('title').style.opacity = newOpacity;
                                this.document.getElementById('hola').style.opacity = newOpacity;
                                console.log("newOpacity", newOpacity)
                                if (newOpacity === 0) {
                                    window.removeEventListener('wheel', wheelListener);
                                    this.location.href = '/about-and-beyond';
                                    animationFinished = true;
                                }
                            }
                        }
                    });
                }, 2000);
            }
        }
    });


}