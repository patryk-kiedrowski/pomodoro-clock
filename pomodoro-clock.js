var workLength = 1;
var breakLength = 1;
var initialWorkLength = 1;
var initialBreakLength = 1;
var buttonClickEvents = 0;
var running = false;
var workProgress = workLength;
var breakProgress = breakLength;
var workState = true;
var breakState = false;
var valuesSet = false;
var valuesChanged = false;
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

  if (running)
    workLength = lengthControl(workLength);

  else
    workLength = initialWorkLength = lengthControl(workLength);

  printResults();
}

function decreaseWork()
{
  workLength--;

  if (running)
    workLength = lengthControl(workLength);

  else
    workLength = initialWorkLength = lengthControl(workLength);

  printResults();
}

function increaseBreak()
{
  breakLength++;

  if (running)
    breakLength = lengthControl(breakLength);

  else
    breakLength = initialBreakLength = lengthControl(breakLength);

  printResults();
}

function decreaseBreak()
{
  breakLength--;

  if (running)
    breakLength = lengthControl(breakLength);

  else
    breakLength = initialBreakLength = lengthControl(breakLength);

  printResults();
}

function whichBarToReduce()
{
  if (workProgress >= 1 && workState == true)
    return reduceWorkBar();

  if (workProgress < 1 && workState == true)
    return resetWorkBar();

  if (breakProgress >= 1 && breakState == true)
    return reduceBreakBar();

  if (breakProgress < 1 && breakState == true)
    return resetBreakBar();
}

function resetWorkBar()
{
  workState = false;
  workProgress = initialWorkLength*60;
  breakState = true;
}

function resetBreakBar()
{
  breakState = false;
  breakProgress = initialBreakLength*60;
  workState = true;
}

function reduceWorkBar()
{
  workProgress--;
  document.getElementById("work-left-bar").style.width = (workProgress/(initialWorkLength*60))*100 + "%";
  printTime(workProgress, "work-time");
}

function reduceBreakBar()
{
  breakProgress--;
  document.getElementById("break-left-bar").style.width = (breakProgress/(initialBreakLength*60))*100 + "%";
  printTime(breakProgress, "break-time");
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

  timer = setInterval(whichBarToReduce, 100);
}

function stopCounting()
{
  clearInterval(timer);
  timer = null
}

function getPreviousValues()
{
  workLength = initialWorkLength;
  breakLength = initialBreakLength;
}

function state()
{
  buttonClickEvents++;

  if (buttonClickEvents%2 == 0)
    valuesSet = false;

  if (valuesSet == false)
  {
    workProgress = document.getElementById("current-work-length").innerHTML * 60;
    breakProgress = document.getElementById("current-break-length").innerHTML * 60;
    valuesSet = true;
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
    getPreviousValues();
  }
}
