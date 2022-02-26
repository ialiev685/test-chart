const text = document.querySelector(".text");
const chart = document.getElementById("chart");
const wrapper = document.querySelector(".wrapper");

const context = chart.getContext("2d");
const widthX = chart.width;
const hetghtY = chart.height;

const handleChangeChart = () => {
  initChart();
};

const getRandomCountDots = () => {
  const numberRandom = Math.round(Math.random() * (10 - 2) + 2);
  text.textContent = `count X:${numberRandom}`;
  return numberRandom;
};

const getRandormCoordinatesY = () => {
  const numberRandom = Math.round(Math.random() * (5 - 1) + 1);
  return numberRandom * 100;
};

wrapper.addEventListener("click", handleChangeChart);

let arrCirc = [];
let arrCoor = [];
let coeff = 0.01;

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

  arrCirc.forEach((item, index) => {
    x = arrCoor[index].x;
    y = arrCoor[index].y;
    // context.lineTo(x, y);
    context.arc(x, y, 5, 0, (Math.PI / 180) * 2, true);

    context.fill();
    context.stroke();
    context.beginPath();
  });

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

    const circ = new Path2D();
    arrCirc.push(circ);
    arrCoor.push({ x, y });
  });

  // console.log(arrCoor);

  draw();
  // window.requestAnimationFrame(draw);
};

initChart();
