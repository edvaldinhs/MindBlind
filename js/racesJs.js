document.addEventListener('DOMContentLoaded', function () {
    let header = document.querySelector('.header-container');
    header.classList.add("show-header");
    
    const list = document.querySelector('.horizontal-carousel ul');
    const items = document.querySelectorAll('.horizontal-carousel li');
    let isDragging = false;
    let startPosition = 0;
    let startTranslate = 0;
    let currentTranslate = 0;
    let clickStartPosition = 0;

    function handleItemClick(selectedItem) {
        items.forEach(item => {
            item.classList.remove('selected');
            item.style.filter = 'grayscale(100%)';
        });

        selectedItem.parentElement.classList.add('selected');
        selectedItem.parentElement.style.filter = 'none';

        const selectedIndex = Array.from(items).indexOf(selectedItem.parentElement);

        const translateValue = -selectedIndex * selectedItem.parentElement.offsetWidth + (list.offsetWidth / 2 - selectedItem.parentElement.offsetWidth / 2);

        list.style.transform = `translateX(${translateValue}px)`;
    }

    handleItemClick(items[0].querySelector('.item'));

    list.addEventListener('mousedown', (e) => {
        clickStartPosition = e.clientX;
        startPosition = e.clientX;
        startTranslate = currentTranslate;
        isDragging = true;
        list.style.transition = 'none';
    });
    
    list.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dragDistance = e.clientX - startPosition;
            currentTranslate = startTranslate + dragDistance;
            list.style.transform = `translateX(${currentTranslate}px)`;
        }
    });
    
    list.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            list.style.transition = 'transform 0.5s ease-in-out';
    
            const nearestIndex = Math.round(-currentTranslate / items[0].offsetWidth);
            currentTranslate = -nearestIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[nearestIndex].offsetWidth / 2);
            list.style.transform = `translateX(${currentTranslate}px)`;
            handleItemClick(items[nearestIndex].querySelector('.item'));
        } else {
            const clickedIndex = Math.floor((clickStartPosition - list.getBoundingClientRect().left) / items[0].offsetWidth);
            const centerTranslate = -clickedIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[clickedIndex].offsetWidth / 2);
            startTranslate = centerTranslate;
        }
    });
    
    list.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            list.style.transition = 'transform 0.5s ease-in-out';
    
            const nearestIndex = Math.round(-currentTranslate / items[0].offsetWidth);
            currentTranslate = -nearestIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[nearestIndex].offsetWidth / 2);
            list.style.transform = `translateX(${currentTranslate}px)`;
            handleItemClick(items[nearestIndex].querySelector('.item'));
        }
    });
    
    list.addEventListener('touchstart', (e) => {
        clickStartPosition = e.touches[0].clientX;
        startPosition = e.touches[0].clientX;
        startTranslate = currentTranslate;
        isDragging = true;
        list.style.transition = 'none';
    });
    
    list.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const dragDistance = e.touches[0].clientX - startPosition;
            currentTranslate = startTranslate + dragDistance;
            list.style.transform = `translateX(${currentTranslate}px)`;
        }
    });
    
    list.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            list.style.transition = 'transform 0.5s ease-in-out';
    
            const nearestIndex = Math.round(-currentTranslate / items[0].offsetWidth);
            currentTranslate = -nearestIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[nearestIndex].offsetWidth / 2);
            list.style.transform = `translateX(${currentTranslate}px)`;
            handleItemClick(items[nearestIndex].querySelector('.item'));
        } else {
            const clickedIndex = Math.floor((clickStartPosition - list.getBoundingClientRect().left) / items[0].offsetWidth);
            const centerTranslate = -clickedIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[clickedIndex].offsetWidth / 2);
            startTranslate = centerTranslate;
        }
    });
    
    list.addEventListener('touchcancel', () => {
        if (isDragging) {
            isDragging = false;
            list.style.transition = 'transform 0.5s ease-in-out';
    
            const nearestIndex = Math.round(-currentTranslate / items[0].offsetWidth);
            currentTranslate = -nearestIndex * items[0].offsetWidth + (list.offsetWidth / 2 - items[nearestIndex].offsetWidth / 2);
            list.style.transform = `translateX(${currentTranslate}px)`;
            handleItemClick(items[nearestIndex].querySelector('.item'));
        }
    });

    items.forEach(item => {
        const itemDiv = item.querySelector('.item');
        itemDiv.addEventListener('click', function () {
            handleItemClick(this);
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
