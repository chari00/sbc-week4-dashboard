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
  // document.location.replace("/");
  overviewContainer.style.display = "none";
  recentlyAdded.style.display = "block";
  searchDiv.style.display = "block";
  // if (overviewContainer) {
  // overviewContainer.style.display = "none";
  // }
  // recentlyAdded.style.display = 'block';
  // searchDiv.style.display = 'block';
};

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("this return to homepage");
  overviewContainer.style.display = "none";
  recentlyAdded.style.display = "block";
  searchDiv.style.display = "block";

  // document.location.replace('/')
  // overviewContainer.remove();
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

const todoInfo = {
  title: taskTitleModal.value,
  date: datetimeModal.value,
  dropdown: dropdownModal.value,
  description: descriptionModal.value,
};
/*
// console.log(`saved task value = ${Object.values(todoInfo)}, savetask key = ${Object.keys(todoInfo)} `);
//get the category the user chose in modal, display in the recently added div
// const category = () => {
//   if (dropdownModal.value === "1") {
//     return "Event";
//   } else if (dropdownModal.value === "2") {
//     return "Task";
//   } else {
//     return "Appointment schedule";
//   }
// };
*/
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

  // Create and display div
  const div = document.createElement("div");
  div.classList.add("recent-added-div");
  div.innerHTML = `<h5>${category(todoInfo.dropdown)}</h5>
           <h6>Title: ${todoInfo.title}</h6>
           <p>Date: ${todoInfo.date} </p>
           <p>Description: ${todoInfo.description}</p>`;
  console.log(div);

  recentlyAdded.append(div);
  taskTitleModal.value = "";
  datetimeModal.value = "today";
  dropdownModal.value = "Select...";
  descriptionModal.value = "";
  // window.location.replace('/')

  // Store in localStorage
  localStorage.setItem("todoInfo", JSON.stringify(todoInfo));
  // const retrieveItem = JSON.parse(localStorage.getItem("todoInfo"));
};
window.addEventListener("load", () => {
  const storedTodoInfo = localStorage.getItem("todoInfo");
  if (storedTodoInfo) {
    const todoInfo = JSON.parse(storedTodoInfo);
    displayStoredItem(todoInfo);
  }
});
const displayStoredItem = (todoInfo) => {
  const div = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "☠️";
  // deleteBtn.style.backgroundColor = 'white'
  div.classList.add("recent-added-div");
  div.innerHTML = `<h5>${category(todoInfo.dropdown)}</h5>
         <h6>Title: ${todoInfo.title}</h6>
         <p>Date: ${todoInfo.date} </p>
         <p>Description: ${todoInfo.description}</p>`;
  recentlyAdded.append(div);
  div.append(deleteBtn);

  // remove the todo info div and localStorage
  deleteBtn.addEventListener("click", () => {
    console.log("its the delete button");
    div.remove();
    localStorage.clear(todoInfo);
  });
};
/*
// const displayEvent = (todoInfo) => {
//   if (todoInfo.dropdown === "1") {
//     document.getElementById("event-container").append(div);
//     console.log(todoInfo.dropdown)
//   }
// };
// displayEvent();
// const displayTask = (todoInfo) => {
//   if (todoInfo.dropdown === "2") {
//     document.getElementById("task-container").append(div);
//   }
// };

// const displayAppointment = (todoInfo) => {
//   if (todoInfo.dropdown === "2") {
//     document.getElementById("appointment-container").append(div);
//   }
// };
*/

// this is the function for the save button
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
  displayAdded();
  // displayRetrievedItems();

  // Retrieve from localStorage
  // const retrieveItem = JSON.parse(localStorage.getItem("todoInfo"));
  // console.log(retrieveItem);
};

console.log(todoInfo);
/*
// const displayRetrievedItems = () => {
//   const retrieveItem = JSON.parse(localStorage.getItem("todoInfo"));
//   console.log(retrieveItem);

//   const div = document.createElement("div");
//   div.classList.add("recent-added-div");
//   div.innerHTML = `<h5>${category()}</h5>
//            <h6>Title: ${retrieveItem.title}</h6>
//            <p>Date: ${retrieveItem.date} </p>
//            <p>Description: ${retrieveItem.description}</p>`;
//   console.log(div);
//    recentlyAdded.append(div);

// };
// displayRetrievedItems();
*/
//this triggers the save button
saveBtn.addEventListener("click", saveTask);

//this triggers the overview sidebar to display the saved data
overview.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("overview button was clicked");
  recentlyAdded.remove();
  searchDiv.remove();
  overviewContainer.style.display = "block";
});
