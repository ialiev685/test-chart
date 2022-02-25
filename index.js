const text = document.querySelector(".text");
const chart = document.getElementById("chart");
const wrapper = document.querySelector(".wrapper");

const context = chart.getContext("2d");
const widthX = chart.width;
const hetghtY = chart.height;

const handleChangeChart = () => {
  draw();
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

const makeChart = {
  startX: 50,
  startY: hetghtY - 100,
  x: 50,
  y: 0,
  vx: 5,
  vy: 2,

  dots: 0,
  step: 0,

  draw: function () {
    // const countDots = getRandomCountDots();
    // const stepDot = Math.round((widthX - 100) / countDots);
    this.dots = getRandomCountDots();
    this.step = Math.round((widthX - 100) / this.dots);
    console.log(this.dots, this.step);
    context.beginPath();

    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#000000";

    context.arc(this.startX, this.startY, 5, 0, (Math.PI / 180) * 2, true);

    context.moveTo(this.startX, this.startY);

    [...Array(this.dots)].forEach((_, index) => {
      this.x += this.step;
      this.y = getRandormCoordinatesY();

      console.log(this.x, this.y);

      context.lineTo(this.x, this.y);

      context.arc(this.x, this.y, 5, 0, (Math.PI / 180) * 2, true);

      context.moveTo(this.x, this.y);

      context.stroke();
    });
  },
};

const draw = () => {
  const widthX = chart.width;
  const hetghtY = chart.height;
  context.clearRect(0, 0, widthX, hetghtY);
  makeChart.draw();

  // const raf = window.requestAnimationFrame(draw);
  // window.cancelAnimationFrame(draw);
};

const clearChart = (context, widthX, hetghtY) => {
  context.beginPath();
  context.clearRect(0, 0, widthX, hetghtY);
};

const initChart = () => {
  makeChart.draw();
};

initChart();
