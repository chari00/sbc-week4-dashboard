const searchBtn = document.getElementById("searchButton");
const taskTitleModal = document.getElementById("task-title");
const datetimeModal = document.getElementById("datetime");
const dropdownModal = document.getElementById("event-dropdown");
const descriptionModal = document.getElementById("description");
const saveBtn = document.getElementById("save");

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

// const savedTask = {
//   title: taskTitleModal.value,
//   date: datetimeModal.value,
//   dropdown: dropdownModal.value,
//   description: descriptionModal.value,
// }
// console.log(savedTask)

const saveTask = (e) => {
  e.preventDefault();
  console.log("save button is clicked");
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
  const recentlyAdded = document.getElementById("recentlyAdded");
  const div = document.createElement("div");
  div.classList.add('recent-added-div')
  div.innerHTML = `<h6>Title: ${taskTitleModal.value}</h6>
            <p>Date: ${datetimeModal.value} </p>
            <p>Description: ${descriptionModal.value}</p>`;
  console.log(div);
  recentlyAdded.append(div);
  taskTitleModal.value = '';
  datetimeModal.value = 'today';
  dropdownModal.value = 'Select...';
  descriptionModal.value = '';
};
//this triggers the add new button
saveBtn.addEventListener("click", saveTask);