const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
const nav = document.getElementById('carouselNav');
const autoPlayBtn = document.getElementById('autoPlayButton');
const timerDisplay = document.getElementById('timerDisplay');

let index = 0;        
let autoPlay = false;  
let interval;         

function showSlide(i) {
  const slideWidth = slides[0].clientWidth; 
  track.style.transform = `translateX(-${i * slideWidth}px)`;
  updateIndicators(); 
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function createIndicators() {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator');
    if (i === 0) dot.classList.add('active'); 
    dot.addEventListener('click', () => {
      index = i;
      showSlide(index);
    });
    nav.appendChild(dot);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function toggleAutoPlay() {
  if (autoPlay) {
    // Stop autoplay
    clearInterval(interval);
    autoPlayBtn.textContent = 'Start Auto Play';
    timerDisplay.textContent = '';
  } else {
    // Start autoplay
    autoPlayBtn.textContent = 'Stop Auto Play';
    let timeLeft = 3; 
    timerDisplay.textContent = `Next in ${timeLeft}s`;

    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft === 0) {
        nextSlide(); // Slide changes every 3 seconds
        timeLeft = 3;
      }
      timerDisplay.textContent = `Next in ${timeLeft}s`;
    }, 1000);
  }
  autoPlay = !autoPlay;
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
autoPlayBtn.addEventListener('click', toggleAutoPlay);

createIndicators();
showSlide(index);
