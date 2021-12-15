const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".control-color");
const range = document.querySelector(".control-range");

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.5;

let painting = false;

function paintStop() {
  painting = false;
  console.log("paint stop");
}

function paintStart() {
  painting = true;
  console.log("paint start");
}

function handleMouseDown() {
  paintStart();
}

function handleMouseUp() {
  paintStop();
}

function handleMouseLeave() {
  paintStop();
}

// ctx.beginPath();
// ctx.moveTo(20, 20);
// ctx.lineTo(130, 130);

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

if (canvas) {
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("mousemove", handleMouseMove);
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}

// console.dir(canvas);
// console.log(ctx);
