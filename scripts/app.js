function init() {
  // Keybindings from Q TO H (16 In total)
  const keyBindings = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'A', 'S', 'D', 'F', 'G', 'H', 'Z', 'X'];
  const animationTime = 300; // Animation duration for button click
  const flashDuration = 1000; // Duration for the background color flash (1 second)

  // Select all sound buttons and assign each a key binding and event listeners
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button, index) => {
    if (index < keyBindings.length) {
      const key = keyBindings[index];
      button.dataset.key = key; // Store key binding in data attribute
      button.querySelector('p').textContent += ` (${key})`; // Display key on button
    }
    button.addEventListener('click', () => playSound(button)); // Play sound on click
  });

  // Listen for keyboard events to trigger sounds
  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toUpperCase(); // Get uppercase version of pressed key
    const button = Array.from(buttons).find(btn => btn.dataset.key === keyPressed); // Find matching button
    if (button) button.click(); // Trigger click event if key matches a button
  });

  // Function to play sound, animate button, flash background, and show head
  function playSound(button) {
    const audio = button.querySelector('audio');
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    button.classList.add('clicked');
    flashBackground();
    showHead();
    setTimeout(() => button.classList.remove('clicked'), animationTime);
  }

  // Toggle head images alternately after each sound play
  let nextHead = 0;
  function showHead() {
    const leftHead = document.querySelector('.left-head');
    const rightHead = document.querySelector('.right-head');
    if (nextHead === 0) {
      leftHead.style.display = 'flex';
      setTimeout(() => leftHead.style.display = 'none', animationTime);
      nextHead = 1;
    } else {
      rightHead.style.display = 'flex';
      setTimeout(() => rightHead.style.display = 'none', animationTime);
      nextHead = 0;
    }
  }

  // Flash a random background color and fade back to black smoothly
  function flashBackground() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.transition = 'background-color 0.1s ease-in-out'; // Instant transition
    document.body.style.backgroundColor = randomColor;

    setTimeout(() => {
        document.body.style.transition = 'background-color 0.5s ease-in-out'; // Smooth transition back
        document.body.style.backgroundColor = 'black';
    }, 100); // Delay before reverting
}

}

// Initialize functionality when the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', init);
