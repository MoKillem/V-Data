//Set generation values
const dataPoints = 100;
const training = (100000-300);
const learningRate = 0.0001;
const RealGrad = 3;
const RealYintercept = 6;
//generate random values
var y_values = [];
var x_values = [];
var borderColor = [];
for (let i = 0; i < dataPoints; i++) {
  y_values.push(RealGrad * i + RealYintercept);
  x_values.push(i);
}
// set colors

for (let i = 0; i < dataPoints; i++) {
  borderColor.push("#FF0000");
}

//error function

function cost(gradient, adder, x, y) {
  var valCost = 0;
  for (let i = 0; i < dataPoints; i++) {
    valCost += 0.5 * Math.pow(gradient * x[i] + adder - y[i], 2);
  }
  return valCost;
}
// first level error function
function levelOneCost(gradient, adder, x, y) {
  var valCost = 0;
  for (let i = 0; i < dataPoints; i++) {
    valCost += 0.5 * Math.pow(gradient * x[i] + adder - y[i], 1);
  }
  return valCost;
}
// derivatives

function derivatives(gradient, adder, x, y) {
  var dgrad = 0;
  var dadder = 0;
  for (let i = 0; i < dataPoints; i++) {
    dadder += gradient * x[i] + adder - y[i];
    dgrad += (gradient * x[i] + adder - y[i]) * x[i];
  }
  dadder = dadder / dataPoints;
  dgrad = dgrad / dataPoints;
  console.log(dadder, dgrad);

  return [dgrad, dadder];
}

//change parameters

function updateParams(gradient, adder, x, y, learn) {
  var derive = derivatives(gradient, adder, x, y);
  gradient -= learn * derive[0];
  adder -= derive[1] * learn;
  return [adder, gradient];
}

//linear regression

function linearRegress(x_values, y_values) {
  var gradient = Math.random() * 10;
  var totalSet = [];
  var adder = Math.random() * 10;
  for (let i = 0; i < training; i++) {
    totalSet = updateParams(gradient, adder, x_values, y_values, learningRate);
    adder = totalSet[0];
    gradient = totalSet[1];
  }
  return [adder, gradient];
}

//Linear Regression graph
var regress = linearRegress(x_values, y_values);
var regress_values = [];
for (let i = 0; i < dataPoints; i++) {
  regress_values.push(regress[1] * i + regress[0]);
}
console.log(regress_values);
console.log(regress);
const meanSquared = cost(regress[1], regress[0], x_values, y_values);
const meanError = levelOneCost(regress[1], regress[0], x_values, y_values);
const gradient = regress[1];
const adder = regress[0];

const planetChartData = {
  type: "line",
  data: {
    labels: x_values,
    datasets: [
      {
        // one scatter graph
        label: "Actual Values",
        type: "scatter",
        data: y_values,
        borderColor: borderColor,
        borderWidth: 3
      },
      {
        // another line graph
        label: "Linear Regression Values",
        type: "line",
        data: regress_values,
        backgroundColor: [
          "rgba(71, 183,132,0)" // Green
        ],
        borderColor: ["#000000"],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 3,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 35
          }
        }
      ]
    }
  }
};


export {
  planetChartData,
  meanSquared,
  meanError,
  gradient,
  adder,
  training,
  learningRate,
  RealGrad,
  RealYintercept
};
