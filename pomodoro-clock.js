var workLength = 25;
var breakLength = 5;
var initialWorkLength = 0;
var initialbreakLength = 0;
var running = false;
var workBarProgress = workLength;
var breakBarProgress = breakLength;
var workState = true;
var breakState = false;
var valuesSet = false;
var timer = null;

$(document).ready(printResults());

function printResults()
{
  document.getElementById("current-work-length").innerHTML = " " + workLength + " ";
  document.getElementById("current-break-length").innerHTML = " " + breakLength + " ";
  document.getElementById("work-time").innerHTML = workLength + ":00";
  document.getElementById("break-time").innerHTML = breakLength + ":00";
}

function lengthControl(length)
{
  if (length > 1)
    return length;

  else
    return 1;
}

function increaseWork()
{
  workLength++;
  workLength = lengthControl(workLength);
  printResults();
}

function decreaseWork()
{
  workLength--;
  workLength = lengthControl(workLength);
  printResults();
}

function increaseBreak()
{
  breakLength++;
  breakLength = lengthControl(breakLength);
  printResults();
}

function decreaseBreak()
{
  breakLength--;
  breakLength = lengthControl(breakLength);
  printResults();
}

function reduceWorkBar()
{
  workBarProgress--;
  workLength--;
  document.getElementById("work-left-bar").style.width = workLength/initialWorkLength*100 + "%";
  document.getElementById("work-time").innerHTML = Math.floor(workLength/60) + ":" + workLength%60;
  console.log(workBarProgress);
}

function reduceBreakBar()
{
  breakBarProgress--;
  breakLength--;
  document.getElementById("break-left-bar").style.width = breakLength/initialBreakLength*100 + "%";
  document.getElementById("break-time").innerHTML = Math.floor(breakLength/60) + ":" + breakLength%60;
  console.log(breakBarProgress);
}

function whichBarToReduce()
{
  if (workBarProgress >= 1 && workState == true)
    return reduceWorkBar();

  if (workBarProgress < 1 && workState == true)
  {
    workState = false;
    workBarProgress = workLength;
    breakState = true;
  }

  if (breakBarProgress >= 1 && breakState == true)
    return reduceBreakBar();

  if (breakBarProgress < 1 && breakState == true)
  {
    breakState = false;
    breakBarProgress = breakLength;
    workState = true;
  }
}

function startCounting()
{
  if (timer !== null)
    return;

  timer = setInterval(whichBarToReduce, 1000);
}

function stopCounting()
{
  clearInterval(timer);
  timer = null
}

function state()
{
  if (valuesSet == false)
  {
    valuesSet = true;
    workLength = workBarProgress = initialWorkLength = document.getElementById("current-work-length").innerHTML * 60;
    breakLength = breakBarProgress = initialBreakLength = document.getElementById("current-break-length").innerHTML * 60;
  }

  if (running == false)
  {
    running = true;
    document.getElementById("button").innerHTML = "STOP";
    startCounting();
  }

  else if (running == true)
  {
    running = false;
    document.getElementById("button").innerHTML = "START";
    stopCounting();
  }
}
