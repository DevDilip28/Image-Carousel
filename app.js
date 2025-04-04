// Select DOM elements
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
const nav = document.getElementById('carouselNav');
const autoPlayBtn = document.getElementById('autoPlayButton');
const timerDisplay = document.getElementById('timerDisplay');

let index = 0;         // Current slide index
let autoPlay = false;  // Auto-play status
let interval;          // Interval timer

// Function to show a specific slide
function showSlide(i) {
  const slideWidth = slides[0].clientWidth; // Get width of one slide
  track.style.transform = `translateX(-${i * slideWidth}px)`; // Slide to that position
  updateIndicators(); // Update dots
}

// Function to update active indicator
function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

// Create indicator dots dynamically
function createIndicators() {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator');
    if (i === 0) dot.classList.add('active'); // First dot active
    dot.addEventListener('click', () => {
      index = i;
      showSlide(index);
    });
    nav.appendChild(dot);
  });
}

// Next slide
function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

// Previous slide
function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// Start or stop auto-play
function toggleAutoPlay() {
  if (autoPlay) {
    // Stop autoplay
    clearInterval(interval);
    autoPlayBtn.textContent = 'Start Auto Play';
    timerDisplay.textContent = '';
  } else {
    // Start autoplay
    autoPlayBtn.textContent = 'Stop Auto Play';
    let timeLeft = 3; // Seconds countdown
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

// Event listeners for buttons
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
autoPlayBtn.addEventListener('click', toggleAutoPlay);

// Initialize carousel
createIndicators();
showSlide(index);
