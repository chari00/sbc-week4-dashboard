const searchBtn = document.getElementById("searchButton");
let taskTitleModal = document.getElementById("task-title");
let datetimeModal = document.getElementById("datetime");
let dropdownModal = document.getElementById("event-dropdown");
let descriptionModal = document.getElementById("description");
const saveBtn = document.getElementById("save");

//this initialize the flatpickr
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

const saveTask = (e) => {
  e.preventDefault();
  console.log("save button is clicked");
  // taskTitle.textContent = e.target.value;
  // datetimeModal = e.target.value;
  // dropdownModal = e.target.value;
  // descriptionModal.textContent = e.target.value;
};
//this triggers the add new button
saveBtn.addEventListener("click", saveTask);
