let currentBox = document.getElementById('box1');
let nextBox = document.getElementById('box2');

document.querySelectorAll('.day-btn').forEach(button => {
    button.addEventListener('click', function() {
        let newColor = this.getAttribute('data-color');

        // Set the next box's color and make it visible
        nextBox.style.backgroundColor = newColor;
        nextBox.classList.remove('hidden');

        // Move the current box up and the next box down simultaneously
        currentBox.style.transform = 'translateY(-100px)';
        currentBox.style.opacity = 0;

        nextBox.style.transform = 'translateY(0)';
        nextBox.style.opacity = 1;

        // After the transition, reset the boxes for the next click
        setTimeout(() => {
            currentBox.classList.add('hidden');
            currentBox.style.transform = 'translateY(0)';
            currentBox.style.opacity = 1;

            // Swap the boxes
            [currentBox, nextBox] = [nextBox, currentBox];
        }, 500);
    });
});