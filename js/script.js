const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input_color");
const tools = document.querySelectorAll(".button_tool");
const sizeButtons = document.querySelectorAll(".button_size");
const clearButton = document.querySelector(".button_clear");

let brushSize = 30;


let isPainting = false;
let activeTool = "brush";

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
})

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;
    if (activeTool == "brush") {
        draw(clientX, clientY);
    }

    if (activeTool == "eraser") {
        erase(clientX, clientY);
    }
})

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        if (activeTool == "brush") {
            draw(clientX, clientY);
        }
        if (activeTool == "eraser") {
            erase(clientX, clientY);
        }
    }
})

canvas.addEventListener("mouseup", () => {
    isPainting = false;
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(
        x - canvas.offsetLeft, 
        y - canvas.offsetTop, 
        brushSize / 2, 
        0, 
        2*Math.PI
    );
    ctx.fill();
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(
        x - canvas.offsetLeft, 
        y - canvas.offsetTop, 
        brushSize / 2, 
        0, 
        2*Math.PI
    );
    ctx.fill();
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action");

    if (action) {
        activeTool = action;
    }
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
})