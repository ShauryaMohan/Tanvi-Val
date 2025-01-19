const NUMBER_OF_OMG = 30;


function animateElement(element, animationClass) {
    return new Promise((resolve) => {
      element.classList.add(animationClass);
      element.addEventListener('animationend', () => {
        // element.classList.remove(animationClass);
        resolve();
      }, { once: true }); // Ensures the event listener is removed after firing once
    });
  }

  async function animateSlide(slide) {
    const elements = slide.querySelectorAll("[data-animation]"); // Get all animated elements
    for (let element of elements) {
      const animationClass = element.dataset.animation; // Read animation class from HTML
      await animateElement(element, animationClass);
    }
  }
  
  async function runOMGSlide() {
    const slide = document.querySelector(".omg-slide");
    for (let i = 0; i < NUMBER_OF_OMG; i++) {
        const newOmg = document.createElement("div");
        newOmg.textContent = "OMG!" + "!".repeat(Math.floor(Math.random() * 4));
        newOmg.classList.add("omg");
        newOmg.style.left = `${Math.random() * 100}vw`;
        newOmg.style.top = `${Math.random() * 100}vh`;
        newOmg.style.rotate = `${Math.random() * 90 - 45}deg`;
        newOmg.dataset.animation = "pop-up";
        slide.appendChild(newOmg);
    }
    const question = document.querySelector(".question-container");
    question.style.display = "none";
    slide.style.display = "block";
    await animateSlide(slide);
  }
  
  async function runPresentation() {
     await runOMGSlide();
     await runHeartRainSlide();
  }

  function addPlease() {
    const question = document.querySelector(".question");
    question.textContent += " Please?";
  }
  
  const yesButton = document.getElementsByClassName("yes-button")[0];
    yesButton.addEventListener("click", runPresentation);

  const noButton = document.getElementsByClassName("no-button")[0];
    noButton.addEventListener("click", addPlease);

async function runHeartRainSlide() {
    const slide = document.querySelector(".heart-slide");
    const prevSlide = document.querySelector(".omg-slide");
    prevSlide.style.display = "none";
    slide.style.display = "block";
    rainHearts();
    await animateSlide(slide);
}



const rainHearts = () => {
    setInterval(() => {
        for(var i = 0; i < 3; i++) {
            createHeart(Math.random() * window.innerWidth);
        }
    }, 100);
}


const createHeart = (pos_x) => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = "❤️";
    heart.style.fontSize = `${Math.random() * 20 + 15}px`;
    heart.style.left = `${pos_x}px`;
    heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
    heart.style.animationDelay = `${Math.random() * 0.2}s`;
    const heartSlide = document.querySelector('.heart-slide');
    heartSlide.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 4000);
}



  