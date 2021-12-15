const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".control-color");
const range = document.querySelector(".control-range");
const mode = document.querySelector("#btn-mode");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

ctx.fillStyle = "#2c2c2c";

let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);

function paintStop() {
  painting = false;
  console.log("paint stop");
}

function paintStart() {
  painting = true;
  console.log("paint start");
}

function handleMouseDown() {
  if (!filling) {
    paintStart();
  }
}

function handleMouseUp() {
  paintStop();
}

function handleMouseLeave() {
  paintStop();
}

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

function deleteBtnBorder() {
  Array.from(colors).forEach((color) => {
    color.style.border = "";
  });
}

function handleColorClick(event) {
  deleteBtnBorder();
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
  //   console.log(event);
  event.target.style.border = "3px solid #000000";
  event.target.style.opacity = "0.6";
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
  //   console.log(event);
  if (event.target.innerText === "fill") {
    event.target.innerText = "line";
    painting = false;
    filling = true;
    console.log(`line to fill--> painting ${painting}, filling ${filling}`);
  } else {
    event.target.innerText = "fill";
    filling = false;
  }
}

function handleClick() {
  if (filling) {
    ctx.fillRect(0, 0, 500, 500);
  }
}

if (canvas) {
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("click", handleClick);
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

document
  .querySelector("a")
  .addEventListener(
    "click",
    (event) => (event.target.href = canvas.toDataURL())
  );
