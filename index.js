// -------------------- validate Loan number --------------------

// -------------------- calculate Loan number --------------------
// function calculate() {
//   let loanPercent = document.querySelector(".loan-calc-rate").value;
//   let loanMonth = document.querySelector(".loan-calc-month").value;
//   let loanReceive = document.querySelector(".loanReceive");
//   let loanReceiveAll = document.querySelector(".loanReceiveAll");
//   let loanValue1 = Number(loanValue.value.replaceAll(".", ""));
//   // console.log(loanValue1);

//   loanReceive.innerHTML = thousands_separators(
//     ((loanValue1 * loanPercent) / 100 / loanMonth).toFixed(0)
//   );
//   let fullM = 100 + Number(loanPercent);
//   // console.log(typeof loanValue1);
//   loanReceiveAll.innerHTML = thousands_separators(
//     ((loanValue1 * fullM) / 100 / loanMonth).toFixed(0)
//   );
// }
// function thousands_separators(num) {
//   var num_parts = num.toString().split(".");
//   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return num_parts.join(".");
// }
//------------ scrollSmooth--------------
const linkScroll = document.getElementById("scroll");
linkScroll.addEventListener("click", ScrollFunction);
function ScrollFunction(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

// ---------------------- Gmail ----------------------
function test() {
  function validEmail(email) {
    var re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements)
      .filter(function (k) {
        return elements[k].name !== "honeypot";
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];
      formData[name] = element.value;
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });
    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "Sheet1"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    // console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const Sub_btn = document.querySelector(".Sub_button");
    Sub_btn.disabled = true;
    const toast = document.querySelector(".toast");
    toast.classList.remove("hidden");
    const reload = setTimeout(function () {
      location.reload(true);
    }, 3500);
    var form = event.target;
    var data = getFormData(form);
    if (data.email && !validEmail(data.email)) {
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        // console.log(xhr.status, xhr.statusText);
        // console.log(xhr.responseText);

        return;
      };
      var encoded = Object.keys(data)
        .map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        })
        .join("&");
      xhr.send(encoded);
    }
  }

  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
}
test();
