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

const homepage = () => {
  if (overviewContainer) {
    overviewContainer.remove();
  }
  //   window.location.replace('/')
  //   overviewContainer.remove();
};
homepage();

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("this return to homepage");
  // homepage();
  window.location.replace("/");
  //   if(window.location.pathname !== '/'){
  //     window.location.replace('/')
  //   } else if (overviewContainer){
  //     overviewContainer.remove();

  //   }
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

const todoInfo = {
  title: "",
  date: datetimeModal.value,
  dropdown: dropdownModal.value,
  description: descriptionModal.value,
};

// console.log(`saved task value = ${Object.values(todoInfo)}, savetask key = ${Object.keys(todoInfo)} `);
//get the category the user chose in modal, display in the recently added div
const category = () => {
  if (dropdownModal.value === "1") {
    return "Event";
  } else if (dropdownModal.value === "2") {
    return "Task";
  } else {
    return "Appointment schedule";
  }
};

const saveTask = (e) => {
  e.preventDefault();
  console.log("DING-DONG that's my save button clicked! 🤪");
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

  // Update todoInfo object with current values
  todoInfo.title = taskTitleModal.value;
  todoInfo.date = datetimeModal.value;
  todoInfo.dropdown = dropdownModal.value;
  todoInfo.description = descriptionModal.value;

  const div = document.createElement("div");
  div.classList.add("recent-added-div");
  div.innerHTML = `<h5>${category()}</h5>
            <h6>Title: ${todoInfo.title}</h6>
            <p>Date: ${todoInfo.date} </p>
            <p>Description: ${todoInfo.description}</p>`;
  console.log(div);
  const storeProperty = Object.keys(todoInfo);
  // console.log(storeProperty);
  const storeVal = Object.values(todoInfo);
  // console.log(storeVal);
  localStorage.setItem(storeProperty, storeVal)
  // console.log(localStorage.setItem(storeProperty, storeVal));
  // localStorage.setItem(dropdownModal.value);
  // localStorage.setItem(descriptionModal.value);

  recentlyAdded.append(div);
  taskTitleModal.value = "";
  datetimeModal.value = "today";
  dropdownModal.value = "Select...";
  descriptionModal.value = "";
  // window.location.replace('/')
};
console.log(todoInfo);

//this triggers the add new button
saveBtn.addEventListener("click", saveTask);

//this triggers the overview sidebar to display the saved data
overview.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("overview button was clicked");
  // overviewContainer.style.display = 'block';
  recentlyAdded.remove();
  // searchDiv.remove();
});

/*


// if category === event
const eventContainer = document.getElementById("event-container");
const eventDiv = document.createElement("div");
eventDiv.classList.add("eventDiv");
eventDiv.innerHTML = `<h6>Title: ${taskTitleModal.value}</h6>
           <p>Date: ${datetimeModal.value} </p>
           <p>Description: ${descriptionModal.value}</p>`;
console.log(eventDiv);
eventContainer.append(eventDiv);

//if category === task
const taskContainer = document.getElementById("task-container");
const taskDiv = document.createElement("div");
taskDiv.classList.add("taskDiv");
taskDiv.innerHTML = `<h6>Title: ${taskTitleModal.value}</h6>
           <p>Date: ${datetimeModal.value} </p>
           <p>Description: ${descriptionModal.value}</p>`;
console.log(taskDiv);
taskContainer.append(taskDiv);

//if category === appointment
const appointmentContainer = document.getElementById("appointment-container");
const appointmentDiv = document.createElement("div");
appointmentDiv.classList.add("appointmentDiv");
appointmentDiv.innerHTML = `<h6>Title: ${taskTitleModal.value}</h6>
           <p>Date: ${datetimeModal.value} </p>
           <p>Description: ${descriptionModal.value}</p>`;
console.log(appointmentDiv);
appointmentContainer.append(appointmentDiv);
*/
