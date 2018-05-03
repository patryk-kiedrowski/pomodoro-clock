var workLength = 1;                 //contains the duration of work session as the user sets it           [in minutes]
var breakLength = 1;                //containts the duration of break session as the user sets it         [in minutes]
var initialWorkLength = 1;          //contains the duration of work session SET by the user               [in minutes]
var initialBreakLength = 1;         //contains the duration of work session SET by the user               [in minutes]
var running = false;                //tracks whether the program is working
var workProgress = workLength;      //contains the value of seconds left in the current work session      [in seconds]
var breakProgress = breakLength;    //contains the value of seconds left in the current break session     [in seconds]
var workState = true;               //checks whether the program is in the work session at the moment
var breakState = false;             //checks whether the program is in the break session at the moment
var workValueReset = true;          //checks where the user changed the duration of the current work session
var breakValueReset = true;         //checks where the user changed the duration of the current break session
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
  if (running == false)
  {
    workLength++;
    workLength = initialWorkLength = lengthControl(workLength);
    workValueReset = true;
    printResults();
  }
}

function decreaseWork()
{
  if (running == false)
  {
    workLength--;
    workLength = initialWorkLength = lengthControl(workLength);
    workValueReset = true;
    printResults();
  }
}

function increaseBreak()
{
  if (running == false)
  {
    breakLength++;
    breakLength = initialBreakLength = lengthControl(breakLength);
    breakValueReset = true;
    printResults();
  }
}

function decreaseBreak()
{
  if (running == false)
  {
    breakLength--;
    breakLength = initialBreakLength = lengthControl(breakLength);
    breakValueReset = true;
    printResults();
  }
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

  timer = setInterval(whichBarToReduce, 1000);
}

function stopCounting()
{
  clearInterval(timer);
  timer = null
}

function state()
{
  if (workValueReset == true)
  {
    workProgress = document.getElementById("current-work-length").innerHTML * 60;
    workValueReset = false;
  }

  if (breakValueReset == true)
  {
    breakProgress = document.getElementById("current-break-length").innerHTML * 60;
    breakValueReset = false;
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
