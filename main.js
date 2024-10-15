import './style.css'


// document.querySelector('#app').innerHTML = `

// `


const svgs = [
'url(public/assets/Vector.svg)', // Path to Vector.svg
      'url(public/assets/Vector2.svg)' // Path to Vector2.svg
];

document.querySelectorAll('.child').forEach(child => {
  const randomSvg = svgs[Math.floor(Math.random() * svgs.length)];
  child.style.backgroundImage = randomSvg;
});

const input = document.getElementById('text-input');
      const catImage = document.getElementById('cat-image');

      input.addEventListener('input', () => {
        if (input.value.toLowerCase().includes('fish')) {
          catImage.src = 'public/assets/cat-openMouth.png';
          animateCat();
          animateTextRemoval();
        } else {
          catImage.src = 'public/assets/cat-closedMouth.png';
        }
      });
      function animateCat() {
        anime({
          targets: '#cat-image',
          translateX: ['-10%', '200%'],
          duration: 500,
          easing: 'linear',
          direction: 'alternate',
          complete: () => {
            catImage.src = 'public/assets/cat-closedMouth.png';
          }
        });
      }
      function animateTextRemoval() {
        anime({
          targets: input,
          opacity: [1, 0],
          duration: 500,
          easing: 'easeOutQuad',
          complete: () => {
            input.value = '';
            input.style.opacity = 1; // Reset opacity after clearing the input
          }
        });
      }
      