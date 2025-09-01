const wrapper = document.querySelector('.services-wrapper');
const cards = document.querySelectorAll('.services-wrapper > div');
const nextBtn = document.querySelector('.slide-btn.next');
const prevBtn = document.querySelector('.slide-btn.prev');

const cardWidth = 320; // Must match CSS
let currentIndex = 1;   // Start from first real card

// Clone first and last for infinite loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, wrapper.firstChild);

const allCards = wrapper.querySelectorAll('div'); // includes clones

function updateCarousel(animate = true) {
    const containerWidth = wrapper.parentElement.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    const translate = -currentIndex * cardWidth + offset;

    wrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
    wrapper.style.transform = `translateX(${translate}px)`;

    allCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
}

// Initial render
updateCarousel(false);

// Buttons
nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();

    if (currentIndex >= allCards.length - 1) {
        setTimeout(() => {
            currentIndex = 1;
            updateCarousel(false);
        }, 500);
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();

    if (currentIndex <= 0) {
        setTimeout(() => {
            currentIndex = allCards.length - 2;
            updateCarousel(false);
        }, 500);
    }
});

// Drag / Swipe
let isDragging = false;
let startPos = 0;

wrapper.addEventListener('mousedown', startDrag);
wrapper.addEventListener('touchstart', startDrag);

wrapper.addEventListener('mousemove', drag);
wrapper.addEventListener('touchmove', drag);

wrapper.addEventListener('mouseup', endDrag);
wrapper.addEventListener('mouseleave', endDrag);
wrapper.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startPos = getPositionX(e);
    wrapper.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    const containerWidth = wrapper.parentElement.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    wrapper.style.transform = `translateX(${-currentIndex * cardWidth + offset + diff}px)`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const endPos = getPositionX(e);
    const diff = endPos - startPos;

    if (diff < -50) nextBtn.click();
    else if (diff > 50) prevBtn.click();
    else updateCarousel();
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Responsive
window.addEventListener('resize', () => updateCarousel(false));
