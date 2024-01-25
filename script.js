const date = document.getElementById('date');
date.textContent = new Date().getFullYear();
const sketchPad = document.getElementById('sketchPad');
const pixelInput = document.getElementById('pixels');
const clearGrid = document.getElementById('clear-grid');
const onButton = document.getElementById('on');
const offButton = document.getElementById('off');

function displayGrid(pixels) {
    sketchPad.style.cssText = "display: flex; flex-wrap: wrap;";
    for (let i = 0; i < pixels; i++) {
        for (let j = 0; j < pixels; j++) {
            const pixelBox = document.createElement('div');
            pixelBox.style.border = '1px solid black';
            pixelBox.style.flex = `1 1 calc(100%/${pixels})`;
            pixelBox.setAttribute('class', 'boxes');
            sketchPad.appendChild(pixelBox);
        }
    }
}


function main() {
    pixelInput.addEventListener('keypress', Key => {
        if (Key.key === "Enter") {
            let pixels = parseInt(document.getElementById('pixels').value);
            document.getElementById('pixels').value = "";
            console.log(pixels);
            console.log(typeof pixels);
            displayGrid(pixels);
        }
    });

    clearGrid.addEventListener('click', () => {
        sketchPad.innerText = "";
    });
    
    onButton.addEventListener('click', () => {
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.style.border = '1px solid black';
        });
    });
    
    offButton.addEventListener('click', () => {
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.style.border = 'none';
        });
    });
    
    sketchPad.addEventListener('mouseover', (child) => {
        const color = document.getElementById('box-color').value;
        const div = child.target;
        if (sketchPad.hasChildNodes())
            div.style.backgroundColor = color;
    });
}

main();
