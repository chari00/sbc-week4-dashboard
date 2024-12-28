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
  // this is the saved items from the local storage.
  saveTodoInfo(todoInfo);
  //this is to display the saved items from the local storage
  displayStoredItem(todoInfo);

  //clear the input
  taskTitleModal.value = "";
  datetimeModal.value = "today";
  dropdownModal.value = "Select...";
  descriptionModal.value = "";

  pageReload();
};

const saveTodoInfo = (todoInfo) => {
  //get and parse the existing items from the local storage to javascript
  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  //push the newly added todoinfo to the exisingtodos that is parsed from the local storage
  existingTodos.push(todoInfo);
  console.log(todoInfo);
  console.log(existingTodos);
  // convert the updated todos to string to save in local storage
  localStorage.setItem("todoInfo", JSON.stringify(existingTodos));
};

window.addEventListener("load", () => pageReload());

//this triggers the delete button
const deleteTodoInfo = (index) => {
  // Retrieve the stored items from local storage
  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  // Remove the item at the specified index
  existingTodos.splice(index, 1);
  // Update the local storage
  localStorage.setItem("todoInfo", JSON.stringify(existingTodos));

  pageReload();
};

// triggers the edit button
const editTodo = (index) => {
  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  const todoToEdit = existingTodos[index];

  //get the data from the existing todo from local storage by correspondig index
  taskTitleModal.value = todoToEdit.title;
  datetimeModal.value = todoToEdit.date;
  dropdownModal.value = todoToEdit.dropdown;
  descriptionModal.value = todoToEdit.description;



  // Change button state and event listener
  saveBtn.textContent = "Update";
  const updateHandler = (e) => updateTodo(e, index);
  saveBtn.removeEventListener("click", saveTask);
  saveBtn.addEventListener("click", updateHandler);

  // Store handler reference for cleanup
  saveBtn.updateHandler = updateHandler;

  // Show the modal
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("exampleModal")
  );
  modal.show();
  // pageReload();
};

const updateTodo = (e, index) => {
  e.preventDefault();

  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];

  const updatedTodo = {
    title: taskTitleModal.value,
    date: datetimeModal.value,
    dropdown: dropdownModal.value,
    description: descriptionModal.value,
  };


  //this is for modal field validation
  if (!updatedTodo.title) {
    return alert("Title cannot be empty");
  }
  if (!updatedTodo.date) {
    return alert("Date cannot be empty");
  }
  if (!updatedTodo.dropdown || updatedTodo.dropdown === "Select...") {
    return alert("Please select a category");
  }
  if (!updatedTodo.description) {
    return alert("Description cannot be empty");
  }

  
  // const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  existingTodos[index] = updatedTodo;
  localStorage.setItem("todoInfo", JSON.stringify(existingTodos));

  // Reset the form and button
  taskTitleModal.value = "";
  datetimeModal.value = "today";
  dropdownModal.value = "Select...";
  descriptionModal.value = "";

  saveBtn.textContent = "Save";
  saveBtn.removeEventListener("click", saveBtn.updateHandler);
  saveBtn.addEventListener("click", saveTask);

  // Close the modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  modal.hide();
  pageReload();
};

const pageReload = () => {
  // Clear the existing display
  recentlyAdded.innerHTML = "";
  // Get the updated todo list from local storage
  const existingTodos = JSON.parse(localStorage.getItem("todoInfo")) || [];
  // this display each todo item
  existingTodos.forEach((todoInfo, index) =>
    displayStoredItem(todoInfo, index)
  );
};

const displayStoredItem = (todoInfo, index) => {
  const div = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("style", "margin-right:10px;");
  deleteBtn.addEventListener("click", () => deleteTodoInfo(index));

  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editTodo(index));
  div.classList.add("recent-added-div");
  div.innerHTML = `<h5>${category(todoInfo.dropdown)}</h5>
         <h6>Title: ${todoInfo.title}</h6>
         <p>Date: ${todoInfo.date} </p>
         <p>Description: ${todoInfo.description}</p>`;
  recentlyAdded.appendChild(div);
  div.appendChild(deleteBtn);
  div.appendChild(editBtn);
};

// this is the function for the save button
const saveTask = (e) => {
  e.preventDefault();
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
