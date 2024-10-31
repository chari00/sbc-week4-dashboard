const searchBtn = document.getElementById("searchButton");
const taskTitleModal = document.getElementById("task-title");
const datetimeModal = document.getElementById("datetime");
const dropdownModal = document.getElementById("event-dropdown");
const descriptionModal = document.getElementById("description");
const recentlyAdded = document.getElementById("recentlyAdded");
const searchDiv = document.querySelector(".main-content");
const saveBtn = document.getElementById("save");
const overview = document.getElementById("overview");
const overviewContainer = document.getElementById("overview-container");
const deleteBtn = document.createElement("button");
const editBtn = document.createElement("button");
const div = document.createElement("div");

const homepage = () => {
  // document.location.replace("/");
  overviewContainer.style.display = "none";
  recentlyAdded.style.display = "block";
  searchDiv.style.display = "block";
};

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("this return to homepage");
  overviewContainer.style.display = "none";
  recentlyAdded.style.display = "block";
  searchDiv.style.display = "block";
  homepage();
});

// this initialize the flatpickr
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datetime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });
});
//this sets the date and time picker format
flatpickr("#datetime", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  altInput: true,
  altFormat: "F j, Y at h:i K",
  minDate: "today",
  maxDate: new Date().fp_incr(),
});

//this triggers the event for search button
searchBtn.addEventListener("click", search);
function search() {
  const userInput = document.getElementById("searchTerm");
  const search = document.getElementById("searches");
  //checks if the user input is empty
  if (userInput.value === "") {
    return alert("Please enter your search");
  }
  const li = document.createElement("li");
  li.innerHTML = userInput.value;
  search.append(li);
  userInput.value = "";
}

// console.log(recentlyAddedDiv);
let todoInfo = [];
const category = (value) => {
  if (value === "1") return "Event";
  if (value === "2") return "Task";
  return "Appointment schedule";
};

// this is the updated todoInfo
const displayAdded = () => {
  const todoInfo = {
    title: taskTitleModal.value,
    date: datetimeModal.value,
    dropdown: dropdownModal.value,
    description: descriptionModal.value,
  };
  console.log(todoInfo);

  saveTodoInfo(todoInfo);
  displayStoredItem(todoInfo);
  
  // const deleteBtn = document.createElement("button");
  // const editBtn = document.createElement("button");
  // const div = document.createElement("div");

  // deleteBtn.textContent = "Delete";
  // editBtn.textContent = "Edit";
  // div.classList.add("recent-added-div");
  // div.innerHTML = `<h5>${category(todoInfo.dropdown)}</h5>
  //          <h6>Title: ${todoInfo.title}</h6>
  //          <p>Date: ${todoInfo.date} </p>
  //          <p>Description: ${todoInfo.description}</p>`;
  // // console.log(div);

  // recentlyAdded.appendChild(div);
  // div.appendChild(deleteBtn);
  // div.appendChild(editBtn);

  //clear the input
  taskTitleModal.value = "";
  datetimeModal.value = "today";
  dropdownModal.value = "Select...";
  descriptionModal.value = "";


  // remove the todo info div and localStorage
  deleteTodo();
  //function call to edit todo info
  editTodo();
};

const saveTodoInfo = (todoInfo) => {
  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  console.log(existingTodos);
  existingTodos.push(todoInfo);
  console.log(todoInfo);
  localStorage.setItem("todoInfo", JSON.stringify(existingTodos));
};

//this triggers the delete button
const deleteTodo = () => {
  deleteBtn.addEventListener("click", () => {
    // console.log("its the delete button");
    div.remove();
    // removeTodoFromStorage(todoInfo);
    localStorage.clear(todoInfo);
  });
};
// triggers the edit button
const editTodo = () => {
  editBtn.addEventListener("click", () => {
    console.log("this is edit button");

  });
};
// persist the info when the page reload
window.addEventListener("load", () => {
  const storedTodoInfo = JSON.parse(localStorage.getItem("todoInfo"));
  console.log(storedTodoInfo);
  if (storedTodoInfo) {
    storedTodoInfo.forEach(todoInfo => displayStoredItem(todoInfo));
  }
});

const displayStoredItem = (todoInfo) => {
  const div = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  div.classList.add("recent-added-div");
  div.innerHTML = `<h5>${category(todoInfo.dropdown)}</h5>
         <h6>Title: ${todoInfo.title}</h6>
         <p>Date: ${todoInfo.date} </p>
         <p>Description: ${todoInfo.description}</p>`;
  recentlyAdded.appendChild(div);
  div.appendChild(deleteBtn);
  div.appendChild(editBtn);


  // remove the todo info div and localStorage item
  deleteTodo();
  editTodo();
};

// this is the function for the save button
const saveTask = (e) => {
  e.preventDefault();
  // console.log("DING-DONG that's my save button clicked! 🤪");
  if (taskTitleModal.value === "") {
    return alert("Please add a title.");
  }
  if (datetimeModal.value === "") {
    return alert("Please add a date.");
  }
  if (dropdownModal.value === "Select...") {
    return alert("Please select a category.");
  }
  if (descriptionModal.value === "") {
    return alert("Please add description.");
  }
  displayAdded();
};

//this triggers the save button
saveBtn.addEventListener("click", saveTask);

//this triggers the overview sidebar to display the saved data
overview.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("overview button was clicked");
  recentlyAdded.style.display = "none";
  searchDiv.style.display = "none";
  overviewContainer.style.display = "block";
});
