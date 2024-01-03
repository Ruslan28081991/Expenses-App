const inputNode = document.getElementById("expensesInput");
const btnNode = document.getElementById("expensesBtn");
const limitNode = document.getElementById("limitValue");
const totalNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyListNode = document.getElementById("historyList");
const clearBtnNode = document.getElementById("clearBtn");
const selectCategoryNode = document.getElementById("categorySelect");
const changeLimitBtn = document.getElementById("changeLimitBtn");

let expenses = [];
let limit = parseInt(limitNode.innerText);

const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
const STATUS_IN_LIMIT = "Все хорошо!";
const STATUS_IN_LIMIT_CLASSNAME = "status";
const STATUS_OUT_OF_LIMIT = "Лимит привышен!";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";
const STORAGE_LABEL_LIMIT = "limit";
const STORAGE_LABEL_EXPENSES = "expenses";

function initLimit() {
  const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
  if (!limitFromStorage) {
    return;
  }
  limitNode.innerText = limitFromStorage;
  limit = parseInt(limitNode.innerText);
}
initLimit();

function calculateExpenses(expenses) {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element.amount;
  });
  return sum;
}

function renderStatus() {
  const total = calculateExpenses(expenses);
  totalNode.innerText = total;
  if (total <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.className = STATUS_IN_LIMIT_CLASSNAME;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
    statusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME;
  }
}

const renderHistory = () => {
  historyListNode.innerHTML = "";
  expenses.forEach((expense) => {
    const historyItem = document.createElement("li");
    historyItem.className = "rub";
    historyItem.innerText = `${expense.category} - ${expense.amount}`;

    historyListNode.appendChild(historyItem);
  });
};

function render() {
  renderHistory();
  renderStatus();
}

function getExpenseFromUser() {
  return parseInt(inputNode.value);
}

function getSelectCategory() {
  return selectCategoryNode.value;
}

function clearInput() {
  inputNode.value = "";
}

function saveExpensesToStorage() {
  const expensesString = JSON.stringify(expenses);
  localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

function addButtonHandler() {
  const currentAmount = getExpenseFromUser();
  if (!currentAmount) {
    alert("Не задана сумма");
    return;
  }

  const currentCategory = getSelectCategory();
  if (currentCategory === "Категории") {
    alert("Не задана категория");
    return;
  }

  const newExpense = { amount: currentAmount, category: currentCategory };
  expenses.push(newExpense);
  saveExpensesToStorage();
  render();
  clearInput(inputNode);
}

function clearButtonHandler() {
  expenses = [];
  render();
}

function changeLimitHandler() {
  const newLimit = prompt("Новый лимит");
  const newLimitValue = parseInt(newLimit);
  if (!newLimitValue) {
    return;
  }

  limitNode.innerText = newLimitValue;
  limit = newLimitValue;
  localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);
  render();
}

btnNode.addEventListener("click", addButtonHandler);
clearBtnNode.addEventListener("click", clearButtonHandler);
changeLimitBtn.addEventListener("click", changeLimitHandler);
