const toggle = document.getElementById('toggle');

// Set initial state based on body class
toggle.checked = document.body.classList.contains('light-mode');

// Listen for toggle changes
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
});


const wrapper = document.querySelector('.services-wrapper');
const cards = document.querySelectorAll('.services-wrapper > div');
const nextBtn = document.querySelector('.slide-btn.next');
const prevBtn = document.querySelector('.slide-btn.prev');

const cardHeight = 150 + 20; // card height + gap
let currentIndex = 1;

// Clone first and last for infinite loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, wrapper.firstChild);

const allCards = wrapper.querySelectorAll('div');

function updateCarousel(animate = true) {
    const containerHeight = wrapper.parentElement.offsetHeight;
    const offset = (containerHeight - 150) / 2;
    const translate = -currentIndex * cardHeight + offset;

    wrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
    wrapper.style.transform = `translateY(${translate}px)`;

    allCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
}

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
    startPos = getPositionY(e);
    wrapper.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionY(e);
    const diff = currentPosition - startPos;
    const containerHeight = wrapper.parentElement.offsetHeight;
    const offset = (containerHeight - 150) / 2;
    wrapper.style.transform = `translateY(${-currentIndex * cardHeight + offset + diff}px)`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const endPos = getPositionY(e);
    const diff = endPos - startPos;

    if (diff < -50) nextBtn.click();
    else if (diff > 50) prevBtn.click();
    else updateCarousel();
}

function getPositionY(e) {
    return e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
}

// Responsive
window.addEventListener('resize', () => updateCarousel(false));
