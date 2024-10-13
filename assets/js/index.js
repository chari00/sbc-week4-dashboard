const searchBtn = document.getElementById('searchButton');


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

searchBtn.addEventListener('click', search);
function search(e) {
  const userInput = document.getElementById('searchTerm').value;
  const search = document.getElementById('searches')
  const li =document.createElement('li')
  li.innerHTML = userInput
  search.append(li)
  document.getElementById('searchTerm').value = "";
}

