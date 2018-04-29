var workLength = 25;
var breakLength = 5;
var initialWorkLength = 25;
var initialbreakLength = 5;
var buttonClickEvents = 0;
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
  if(!running)
  {
    workLength++;
    workLength = initialWorkLength = lengthControl(workLength);
    printResults();
  }
}

function decreaseWork()
{
  if(!running)
  {
    workLength--;
    workLength = initialWorkLength = lengthControl(workLength);
    printResults();
  }
}

function increaseBreak()
{
  if(!running)
  {
    breakLength++;
    breakLength = initialBreakLength = lengthControl(breakLength);
    printResults();
  }
}

function decreaseBreak()
{
  if(!running)
  {
    breakLength--;
    breakLength = initialBreakLength = lengthControl(breakLength);
    printResults();
  }
}

function whichBarToReduce()
{
  if (workBarProgress >= 1 && workState == true)
    return reduceWorkBar();

  if (workBarProgress < 1 && workState == true)
  {
    workState = false;
    workBarProgress = workLength = initialWorkLength;
    breakState = true;
  }

  if (breakBarProgress >= 1 && breakState == true)
    return reduceBreakBar();

  if (breakBarProgress < 1 && breakState == true)
  {
    breakState = false;
    breakBarProgress = breakLength = initialBreakLength;
    workState = true;
  }
}

function reduceWorkBar()
{
  workBarProgress--;
  workLength--;
  document.getElementById("work-left-bar").style.width = workLength/initialWorkLength*100 + "%";
  printTime(workLength, "work-time");
}

function reduceBreakBar()
{
  breakBarProgress--;
  breakLength--;
  document.getElementById("break-left-bar").style.width = breakLength/initialBreakLength*100 + "%";
  printTime(breakLength, "break-time");
}

function printTime(time, target)
{
  if (Math.floor(time%60) < 10)
    document.getElementById(target).innerHTML = Math.floor(time/60) + ":0" + time%60;

  else document.getElementById(target).innerHTML = Math.floor(time/60) + ":" + time%60;
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

function setPreviousValues()
{
  workLength = initialWorkLength / 60;
  breakLength = initialBreakLength / 60;
}

function state()
{
  buttonClickEvents++;

  if (buttonClickEvents%2 == 0)
    valuesSet = false;

  if (valuesSet == false)
  {
    workLength = workBarProgress = initialWorkLength = document.getElementById("current-work-length").innerHTML * 60;
    breakLength = breakBarProgress = initialBreakLength = document.getElementById("current-break-length").innerHTML * 60;
    valuesSet = true;
  }

  if (buttonClickEvents)

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
    setPreviousValues();
  }
}
