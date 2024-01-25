const date = document.getElementById('date');
date.textContent = new Date().getFullYear();
const sketchPad = document.getElementById('sketchPad');
const pixelInput = document.getElementById('pixels');
const clearGrid = document.getElementById('clear-grid');
const onButton = document.getElementById('on');
const offButton = document.getElementById('off');
const eraserOn = document.getElementById('eraser-on');
const eraserOff = document.getElementById('eraser-off');
const eraserState = document.getElementById('eraser-value');
const gridState = document.getElementById('grid-value');

function displayGrid(pixels) {
    sketchPad.style.cssText = "display: flex; flex-wrap: wrap;";
    for (let i = 0; i < pixels * pixels; i++) {
        const pixelBox = document.createElement('div');
        pixelBox.style.border = '1px solid black';
        pixelBox.style.flex = `1 1 calc(100%/${pixels})`;
        pixelBox.setAttribute('class', 'boxes');
        sketchPad.appendChild(pixelBox);
    }
}

function main() {
    let isDragging = false;
    let isErasing = false;

    pixelInput.addEventListener('keypress', Key => {
        if (Key.key === "Enter") {
            let pixels = parseInt(document.getElementById('pixels').value);
            document.getElementById('pixels').value = "";
            if (pixels < 0 || pixels > 100)
                alert("Pixels Range: [0, 100]\nIssue: Pixels out of range.");
            else
                displayGrid(pixels);
        }
    });

    clearGrid.addEventListener('click', () => {
        sketchPad.innerText = "";
        gridState.innerText = "";
        eraserState.innerText = "";
    });
    
    onButton.addEventListener('click', () => {
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.style.border = '1px solid black';
        });
        gridState.innerText = " Grid: On";
    });
    
    offButton.addEventListener('click', () => {
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => {
            box.style.border = 'none';
        });
        gridState.innerText = " Grid: Off";
    });

    eraserOn.addEventListener('click', () => {
        isErasing = true; 
        eraserState.innerText = " Eraser: On";
    });
    
    eraserOff.addEventListener('click', () => {
        isErasing = false;
        eraserState.innerText = " Eraser: Off";
    });
    
    sketchPad.addEventListener('mousedown', (event) => {
        const color = document.getElementById('box-color').value;
        const div = event.target;
        isDragging = true;
        if (sketchPad.hasChildNodes())
            if (isErasing)
                div.style.backgroundColor = "rgb(232, 232, 232)";
            else
                div.style.backgroundColor = color;
    });
    
    sketchPad.addEventListener('mouseup', () => { isDragging = false; });
    
    sketchPad.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const color = document.getElementById('box-color').value;
            const div = event.target;
            if (sketchPad.hasChildNodes() && isDragging)
                if (isErasing)
                    div.style.backgroundColor = "rgb(232, 232, 232)";
                else
                    div.style.backgroundColor = color;
        }
    });
}

main();
