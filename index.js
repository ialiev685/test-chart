const text = document.querySelector(".text");
const chart = document.getElementById("chart");
const wrapper = document.querySelector(".wrapper");

const handleChangeChart = (e) => {
  // console.log(e.target.tagName);
  // console.log(e.currentTarget.tagName);
  getRandomCountDots();
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

const draw = (context, widthX) => {
  const countDot = getRandomCountDots();
  const stepDot = Math.round(widthX / countDot);
  // console.log(stepDot);
  // console.log(widthX);
  let x = 50;

  context.beginPath();
  context.moveTo(x, 500);
  [...Array(countDot)].forEach((_, index) => {
    // context.fillStyle = "#FFFFFF";
    // context.arc(100, 500, 5, 0, (Math.PI / 180) * 2, true);
    // context.fill();
    x += stepDot;
    console.log("x", x);
    context.lineTo(x, getRandormCoordinatesY());
    context.stroke();
  });
};

const initChart = () => {
  if (chart.getContext) {
    const context = chart.getContext("2d");
    const widthX = chart.width - 100;
    draw(context, widthX);
    // console.log(context);
  }
};

initChart();
