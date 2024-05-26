let currentStep = 0;
let steps = [];
let gap = 0;
let i = 0;
let j = 0;
let array = [];
let sortingInProgress = false;

function inputFields() {
  const arraySize = document.getElementById("arraySize").value;
  const arrayInputFields = document.getElementById("arrayInputFields");
  arrayInputFields.innerHTML = "";

  if (arraySize > 1) {
    for (let i = 0; i < arraySize; i++) {
      const inputField = document.createElement("input");
      inputField.type = "number";
      inputField.id = `arrayValue${i}`;
      inputField.className = "inputClass";
      inputField.required = true;
      arrayInputFields.appendChild(inputField);
    }
    document.getElementById("input-section").style.display = "none";
    document.getElementById("sortButton").style.display = "inline-block";
    document.getElementById("header").innerHTML = "Enter Array Elements";
  } else {
    document.getElementById("header").innerHTML = "Enter a valid number.";
  }
}

function arrays(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(parseInt(document.getElementById(`arrayValue${i}`).value));
  }
  return arr;
}

function arraySorting(arr) {
  document.getElementById("header").innerHTML = "";

  sortingInProgress = true;
  array = arr;
  currentStep = 0;
  gap = Math.floor(array.length / 2);
  i = gap;
  j = i;
  steps = [array.slice()];
  document.getElementById("nextButton").style.display = "inline-block";
  displayNextStep();
}

const sortingStepsDiv = document.getElementById("sortingSteps");
sortingStepsDiv.style.display = "none";
function displayNextStep() {
  sortingStepsDiv.innerHTML = "";
  sortingStepsDiv.style.display = "inline-block";

  if (currentStep < steps.length) {
    const stepElement = document.createElement("div");
    stepElement.textContent = ` ${steps[currentStep].join(", ")}`;
    sortingStepsDiv.appendChild(stepElement);
    currentStep++;
  } else if (sortingInProgress) {
    sortNextStep();
  }
}

function sortNextStep() {
  if (gap > 0) {
    if (i < array.length) {
      if (j >= gap && array[j - gap] > array[j]) {
        let temp = array[j];
        array[j] = array[j - gap];
        array[j - gap] = temp;
        steps.push(array.slice());
        j -= gap;
      } else {
        i++;
        j = i;
      }
    } else {
      gap = Math.floor(gap / 2);
      i = gap;
      j = i;
    }
    displayNextStep();
  } else {
    sortingInProgress = false;
    document.getElementById("nextButton").style.display = "none";
    sortingStepsDiv.innerHTML = "The sorting is Completed";
  }
}
const arrayFields = document.getElementById("arrayInputFields");
const sortButton = document.getElementById("sortButton");
function sortArray() {
  const arraySize = document.getElementById("arraySize").value;
  array = arrays(arraySize);
  arraySorting(array);
  arrayFields.style.display = "none";
  sortButton.style.display = "none";
}
