const inputNode = document.getElementById("expenses__input");
const btnNode = document.getElementById("expenses__btn");
const historyNode = document.getElementById("history");
const totalNode = document.getElementById("total");
const limitNode = document.getElementById("limit");
const statusNode = document.getElementById("status");

let expenses = [];
const LIMIT = 10000;
limitNode.innerText = LIMIT;

btnNode.addEventListener("click", function () {
  if (!inputNode.value) {
    return;
  }
  const expense = parseInt(inputNode.value);
  inputNode.value = "";

  expenses.push(expense);

  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} руб.</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  totalNode.innerText = sum;

  if (sum <= LIMIT) {
    statusNode.innerText = "Все хорошо";
  } else {
    statusNode.innerText = "Лимит привышен!";
  }
});
