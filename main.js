import './style.css'


// Observer interface
class Observer {
  update(data) {}
}

// Subject interface
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Concrete Subject: TextInput
class TextInput extends Subject {
  constructor(inputElement) {
    super();
    this.inputElement = inputElement;
    this.inputElement.addEventListener('input', () => this.notifyObservers(this.inputElement.value));
  }
}

// Concrete Observer: Cat
class Cat extends Observer {
  constructor(catImageElement) {
    super();
    this.catImage = catImageElement;
  }

  update(text) {
    if (text.toLowerCase().includes('fish')) {
      this.eatFish();
    } else {
      this.resetCat();
    }
  }

  eatFish() {
    this.catImage.src = 'assets/cat-openMouth.png';
    this.animateCat();
    this.animateTextRemoval();
  }

  resetCat() {
    this.catImage.src = 'assets/cat-closedMouth.png';
  }

  animateCat() {
    anime({
      targets: this.catImage,
      translateX: ['-10%', '200%'],
      duration: 500,
      easing: 'linear',
      direction: 'alternate',
      complete: () => this.resetCat()
    });
  }

  animateTextRemoval() {
    const input = document.getElementById('text-input');
    anime({
      targets: input,
      opacity: [1, 0],
      duration: 500,
      easing: 'easeOutQuad',
      complete: () => {
        input.value = '';
        input.style.opacity = 1;
      }
    });
  }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('text-input');
  const catImageElement = document.getElementById('cat-image');

  const textInput = new TextInput(inputElement);
  const cat = new Cat(catImageElement);

  textInput.addObserver(cat);

  // SVG background setup (unrelated to Observer pattern)
  const svgs = [
    'url(assets/Vector.svg)',
    'url(assets/Vector2.svg)'
  ];

  document.querySelectorAll('.child').forEach(child => {
    const randomSvg = svgs[Math.floor(Math.random() * svgs.length)];
    child.style.backgroundImage = randomSvg;
  });
});