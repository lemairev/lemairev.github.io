// strict mode to improve perf & error msg
"use strict";

// Leaftlet Map
var map = L.map('map').setView([48.856614, 2.3522219], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Contact Form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});


// referenced the btn & add event when clicking on the btn
// const switcher = document.querySelector(".btn");

// manage theme color
// switcher.addEventListener("click", function () {
//   var element = document.body;
//   var bsTheme = element.dataset.bsTheme;
//   element.dataset.bsTheme = bsTheme == "light" ? "dark" : "light";

//   if (bsTheme == "light") {
//     this.textContent = "Light";
//   } else {
//     this.textContent = "Dark";
//   }
//   console.log("current theme is " + bsTheme);
// });
