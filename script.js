/**
 * BIRTHDAY WEBSITE CONFIGURATION
 * Change these values to personalize the website
 */
const CONFIG = {
    birthdayName: "Anjali",
    birthdayDate: "July 11, 2026 22:29:00", // Format: Month DD, YYYY HH:MM:SS
    typingMessages: [
        "Dear ANJALI ,",
        "Happy Birthday to the most beautiful girl I know.",
          "On this special day, I want to tell you how truly amazing you are.",
              "Your eyes have a sparkle that can brighten even the darkest day.",
                 " Your beautiful hair adds so much charm to your personality.",
                       "Your face carries a natural beauty that is impossible to ignore.",
                            "Your voice is so soft and sweet that it feels like music to my ears.",
                                "Every time I see you, I realize how special and graceful you are.",
                                    "Your smile, your kindness, and the way you carry yourself make you even more attractive.",
                                        "I hope your birthday is filled with happiness, love, and all the wonderful moments you deserve.",
                                            "Stay as beautiful, cheerful, and wonderful as you are.",
                                                "Happy Birthday once again! 🎂❤️ ❤️"
    ],
    letterMsg: "To my favorite person, <br><br>I wanted to create something special for you. You are kind, beautiful, and mean so much to me. I hope this small surprise brings a smile to your face just like you do to mine every day. <br><br>Forever yours.",
    photos: [

    "assets/images/1.jpg",

    "assets/images/2.jpg",

    "assets/images/3.png",

    "assets/images/4.png",

    "assets/images/5.png",

    "assets/images/6.png",

    "assets/images/7.jpg",

    "assets/images/8.jpg",

    "assets/images/9.jpg",

    "assets/images/10.png",
]
};

// --- GLOBAL VARIABLES ---
let currentSlide = 0;
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    setupGallery();
    setupCountdown();
    document.getElementById('letter-text').innerHTML = CONFIG.letterMsg;
    document.getElementById('celebration-name').innerText = `Happy Birthday ${CONFIG.birthdayName}!`;
});

// --- WELCOME SCREEN LOGIC ---
document.getElementById('start-button').addEventListener('click', () => {
    // Hide welcome screen
    document.getElementById('welcome-screen').classList.add('hidden');
    
    // Show main content
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('music-toggle').classList.remove('hidden');
    
    // Start Music
    bgMusic.play().catch(e => console.log("Autoplay blocked, waiting for interaction"));
    
    // Start Animations
    startTyping();
    createHearts();
    createBalloons();
    triggerConfetti();
});

// --- MUSIC CONTROL ---
musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// --- TYPING ANIMATION ---
async function startTyping() {
    const textElement = document.getElementById('birthday-text');
    for (let sentence of CONFIG.typingMessages) {
        await typeSentence(sentence, textElement);
        await new Promise(resolve => setTimeout(resolve, 1000));
        textElement.innerHTML += '<br>';
    }
}

function typeSentence(sentence, element) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            element.innerHTML += sentence.charAt(i);
            i++;
            if (i > sentence.length) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}

// --- COUNTDOWN TIMER ---
function setupCountdown() {
    const countDate = new Date(CONFIG.birthdayDate).getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = d < 0 ? 0 : d;
        document.getElementById('hours').innerText = h < 0 ? 0 : h;
        document.getElementById('minutes').innerText = m < 0 ? 0 : m;
        document.getElementById('seconds').innerText = s < 0 ? 0 : s;

        if (gap <= 0) {
            clearInterval(timer);

            document.getElementById('countdown').innerHTML =
                "<h2>🎂 Happy Birthday! ❤️</h2>";

            document.getElementById('after-countdown')
                .classList.remove('hidden');

            
        }
    }, 1000);
}
// --- GALLERY LOGIC ---
function setupGallery() {
    const slider = document.querySelector('.slider');
    CONFIG.photos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        slider.appendChild(img);
    });
}

function moveSlider(direction) {
    const slider = document.querySelector('.slider');
    const totalSlides = CONFIG.photos.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- ENVELOPE LOGIC ---
function openEnvelope() {
    const env = document.querySelector('.envelope');
    env.classList.toggle('open');
    if(env.classList.contains('open')) {
        triggerConfetti();
    }
}

// --- BACKGROUND ANIMATIONS (HEARTS & BALLOONS) ---
function createHearts() {
    const container = document.getElementById('hearts-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 500);
}

function createBalloons() {
    const container = document.getElementById('balloons-container');
    const colors = ['#ffafbd', '#c9b1ff', '#ffd700', '#ff6b6b'];
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 8000);
    }, 2000);
}

// --- CONFETTI EFFECT ---
function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffafbd', '#c9b1ff', '#d4af37']
    });
}

// --- SMOOTH SCROLLING ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
