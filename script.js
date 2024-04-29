// const inputArray = [0, 4, 0, 0, 0, 6,0, 4, 0];

function performOperation() {
  clearTable();
  const inputArrayString = document.getElementById("arrayInput").value.trim();
  const inputArray = inputArrayString
    .split(",")
    .map((item) => parseInt(item.trim()));
  createTable({ array: inputArray, type: "walls" });
  const waterInTank = fillWater(inputArray);
  createTable({ array: waterInTank, type: "water", wallsArray: inputArray });
}

function fillWater(inputArray) {
  let arr = [...inputArray];
  let temp = [];
  let leftWall;
  let rightWall;
  arr.forEach((level, index) => {
    if ((leftWall != null || leftWall != undefined) && level != 0) {
      rightWall = index;

      for (i = leftWall + 1; i < rightWall; i++) {
        temp[i] = Math.min(arr[leftWall], arr[rightWall]);
      }
      temp[index] = arr[index];
      leftWall = index;
      rightWall = undefined;
    } else if (level != 0) {
      leftWall = index;
      temp.push(arr[index]);
    } else if (level === 0) {
      temp.push(0);
    }
  });
  return temp;
}

function createTable({ array, type, wallsArray }) {
  const Container = document.getElementById("container");
  const tableContainer = document.createElement("div");
  tableContainer.setAttribute("id", "tableContainer");
  const heading = document.createElement("h1");
  heading.textContent = type === "walls" ? "INPUT" : "OUTPUT";
  tableContainer.appendChild(heading);
  const numRows = Math.max(...array);
  const table = document.createElement("table");
  table.setAttribute("id", "colorTable");

  for (let i = 0; i <= numRows - 1; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < array.length; j++) {
      const cell = document.createElement("td");
      if (i >= numRows - array[j]) {
        if (type == "walls") {
          cell.style.backgroundColor = "gray";
        } else {
          cell.style.backgroundColor =
            array[j] === wallsArray[j] ? "gray" : "blue";
        }
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  tableContainer.appendChild(table);
  if (type === "water") {
    const output = document.createElement("h2");
    output.textContent = `total water quantity is ${totalWater(
      wallsArray,
      array
    )}`;
    tableContainer.appendChild(output);
  }
  Container.appendChild(tableContainer);
}

function totalWater(inputArray, waterInTank) {
  const waterQuantity = sumArray(waterInTank) - sumArray(inputArray);
  return waterQuantity;
}
function clearTable() {
  const colorTable = document.getElementById("container");
  while (colorTable.firstChild) {
    colorTable.removeChild(colorTable.firstChild);
  }
}
function sumArray(array) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
