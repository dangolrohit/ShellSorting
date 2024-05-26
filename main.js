let currentStep = 0;
let steps = [];
let header = document.getElementById("header");
let sortButton = document.getElementById("sortButton");

function inputFields() {
  const arraySize = document.getElementById("arraySize").value;
  const arrayInputFields = document.getElementById("arrayInputFields");
  arrayInputFields.innerHTML = "";

  if (arraySize > 1) {
    for (let i = 0; i < arraySize; i++) {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.id = `arrayValue${i}`;
      inputField.className = "inputClass";
      inputField.required = true;
      arrayInputFields.appendChild(inputField);
    }

    document.getElementById("sortButton").style.display = "inline-block";
    header.innerHTML = " ";
  } else {
    header.innerHTML = "Enter a valid number.";
    sortButton.style.display = "none";
  }
}

function arraySorting(arr) {
  let n = arr.length;
  steps = [];
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        steps.push(arr.slice());
      }
      arr[j] = temp;
    }
  }
  return arr;
}

function arrays(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(parseInt(document.getElementById(`arrayValue${i}`).value));
  }
  return arr;
}

function displayNextStep() {
  const sortingStepsDiv = document.getElementById("sortingSteps");
  sortingStepsDiv.innerHTML = "";

  if (currentStep < steps.length) {
    const stepElement = document.createElement("div");
    stepElement.textContent = `Step ${currentStep + 1}: ${steps[
      currentStep
    ].join(", ")}`;
    sortingStepsDiv.appendChild(stepElement);
    currentStep++;
  }
}

function sortArray() {
  const arraySize = document.getElementById("arraySize").value;
  let array = arrays(arraySize);
  array = arraySorting(array);
  console.log(array);
}
