const text = document.querySelector(".text");
const chart = document.getElementById("chart");
const wrapper = document.querySelector(".wrapper");

const context = chart.getContext("2d");
const widthX = chart.width;
const hetghtY = chart.height;

let arrCirc = [];
let arrCoor = [];
let coeff = 0.01;

const getRandomCountDots = () => {
  const numberRandom = Math.round(Math.random() * (10 - 2) + 2);
  text.textContent = `count X:${numberRandom}`;
  return numberRandom;
};

const getRandormCoordinatesY = () => {
  const numberRandom = Math.round(Math.random() * (5 - 1) + 1);
  return numberRandom * 100;
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
  console.log("arrCoorTransit", arrCoorTransit);
  console.log("arrCoor", arrCoor);
  const lastIndex = arrCoor.length - 1;
  arrCoor = [];

  [...Array(dots)].forEach((_, index) => {
    x += step;
    y = getRandormCoordinatesY();

    let prevX = arrCoorTransit[index]?.curX;
    let prevY = arrCoorTransit[index]?.curX;

    let lastPrevX = arrCoorTransit[lastIndex].curX;
    let lastPrevY = arrCoorTransit[lastIndex].curY;

    curX = prevX === undefined ? lastPrevX : arrCoorTransit[index].curX;
    curY = prevY === undefined ? lastPrevY : arrCoorTransit[index].curY;

    // console.log("prev", prevX);

    // console.log("проблемный:", arrCoorTransit[index].curX, "точек:", dots);
    arrCoor[index] = { curX, curY, nextX: x, nextY: y };
  });
  // initChart();
  // console.log("новый arrCoor", arrCoor);
  draw();
};
wrapper.addEventListener("click", handleChangeChart);

const draw = () => {
  const widthX = chart.width;
  const hetghtY = chart.height;
  context.clearRect(0, 0, widthX, hetghtY);
  let startX = 50;
  let startY = hetghtY - 100;

  let x;
  let y;

  // const dots = getRandomCountDots();
  // const step = Math.round((widthX - 100) / dots);

  context.beginPath();

  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#000000";

  context.arc(startX, startY, 5, 0, (Math.PI / 180) * 2, true);

  // context.moveTo(startX, startY);
  context.fill();
  context.stroke();

  context.beginPath();

  coeff += 0.02;
  console.log(arrCoor);
  arrCoor.forEach((item, index) => {
    nextX = item.nextX === 0 ? 0 : item.nextX - item.curX;
    nextY = item.nextY === 0 ? 0 : item.nextY - item.curY;

    x = item.curX + nextX * coeff;
    y = item.curY + nextY * coeff;
    // context.lineTo(x, y);
    context.arc(x, y, 5, 0, (Math.PI / 180) * 2, true);

    context.fill();
    context.stroke();
    context.beginPath();
  });

  console.log("base", arrCoor);

  if (coeff < 1) window.requestAnimationFrame(draw);
};

const initChart = () => {
  const dots = getRandomCountDots();
  const step = Math.round((widthX - 100) / dots);

  arrCirc = [];
  arrCoor = [];
  coeff = 0.01;

  let x = 50;
  let y;

  [...Array(dots)].forEach((_, index) => {
    x += step;
    y = getRandormCoordinatesY();

    // const circ = new Path2D();
    // arrCirc.push(circ);
    arrCoor.push({ curX: x, curY: y, nextX: 0, nextY: 0 });
  });

  draw();
  // window.requestAnimationFrame(draw);
};

initChart();
