const text = document.querySelector(".text");
const chart = document.getElementById("chart");
const wrapper = document.querySelector(".wrapper");

const context = chart.getContext("2d");
const widthX = chart.width;
const hetghtY = chart.height;

let arrCirc = [];
let arrCoor = [];
let coeff = 0.01;

let startX = 50;
let startY = hetghtY - 100;

const getRandomCountDots = () => {
  const numberRandom = Math.round(Math.random() * (10 - 2) + 2);
  text.textContent = `count X:${numberRandom}`;
  return numberRandom;
};

const getRandormCoordinatesY = () => {
  const numberRandom = Math.round(Math.random() * (5 - 1) + 1);
  return numberRandom * 100;
};

const countingCoordinate = (item) => {
  let nextX = item.nextX === 0 ? 0 : item.nextX - item.curX;
  let nextY = item.nextY === 0 ? 0 : item.nextY - item.curY;

  x = item.curX + nextX * coeff;
  y = item.curY + nextY * coeff;

  return { x, y };
};

const handleChangeChart = () => {
  const dots = getRandomCountDots();
  const step = Math.round((widthX - 100) / dots);
  let x = 0;
  let y;

  coeff = 0.01;

  let curX = 0;
  let curY = 0;

  const arrCoorTransit = arrCoor;

  arrCoor = [];

  [...Array(dots)].forEach((_, index) => {
    x += index === 0 ? step + startX : step;
    y = getRandormCoordinatesY();

    let prevX = arrCoorTransit[index]?.curX;
    let prevY = arrCoorTransit[index]?.curX;

    curX = prevX === undefined ? x : arrCoorTransit[index].curX;
    curY = prevY === undefined ? y : arrCoorTransit[index].curY;

    arrCoor[index] = { curX, curY, nextX: x, nextY: y };
  });
  arrCoor.sort((a, b) => a - b);

  draw();
};
wrapper.addEventListener("click", handleChangeChart);

const draw = () => {
  context.clearRect(0, 0, widthX, hetghtY);

  let x;
  let y;

  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#000000";

  coeff += 0.02;

  context.moveTo(50, 500);

  arrCoor.forEach((item, index) => {
    const { x, y } = countingCoordinate(item);

    context.lineTo(x, y);
    context.moveTo(x, y);
    context.stroke();
    context.closePath();
  });

  context.beginPath();

  arrCoor.forEach((item, index) => {
    const { x, y } = countingCoordinate(item);

    context.arc(x, y, 7, 0, (Math.PI / 180) * 2, true);

    context.fill();
    context.stroke();
    context.beginPath();
    context.closePath();
  });

  context.arc(50, 500, 7, 0, (Math.PI / 180) * 2, true);
  context.fill();

  if (coeff < 1) window.requestAnimationFrame(draw);
};

const initChart = () => {
  const dots = getRandomCountDots();
  const step = Math.round((widthX - 100) / dots);

  arrCirc = [];
  arrCoor = [];
  coeff = 0.01;

  let x = 0;
  let y;

  [...Array(dots)].forEach((_, index) => {
    x += index === 0 ? step + startX : step;
    y = getRandormCoordinatesY();

    arrCoor.push({ curX: x, curY: y, nextX: 0, nextY: 0 });
  });

  draw();
};

initChart();
