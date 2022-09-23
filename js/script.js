var signUpForm = document.getElementById("signUpForm");
var firstNameInput = document.getElementById("firstNameInput");
var lastNameInput = document.getElementById("lastNameInput");
var mailInput = document.getElementById("mailInput");
var passInput = document.getElementById("passInput");
var rePassInput = document.getElementById("rePassInput");
var signUpBtn = document.getElementById("signUpBtn");
var date = new Date("11/10/2026");
var deleteDate = new Date("11/10/1999");
var signInForm = document.getElementById("signInForm");
var signInMailInput = document.getElementById("signInMailInput");
var signInPassInput = document.getElementById("signInPassInput");
var signInBtn = document.getElementById("signInBtn");
var signInTitle = document.getElementById("signInTitle");
var signUpTitle = document.getElementById("signUpTitle");
var signInValidationTxt = document.getElementById("signInValidationTxt");

// signUpBtn click
signUpBtn.addEventListener("click", function () {
  if (!firstNameInput.validity.valid) {
    alert("First name is required and must include letters ONLY");
  }
  if (!lastNameInput.validity.valid) {
    alert("Last name is required and must include letters ONLY");
  }
  if (!mailInput.validity.valid) {
    alert('E-mail should be like "text@domin.extension"');
  }
  if (!passInput.validity.valid) {
    alert(
      "Password should contains at minimum eight characters, at least one letter and one number"
    );
  }
  if (passInput.value != rePassInput.value) {
    alert("Please enter correct password again!");
    rePassInput.value = "";
  }
  if (signUpForm.checkValidity()) {
    // console.log('valid form');
    setCookie("fname", `${firstNameInput.value}`, date);
    setCookie("lname", `${lastNameInput.value}`, date);
    setCookie("mail", `${mailInput.value}`, date);
    setCookie("password", `${passInput.value}`, date);
    signUpTitle.style.display = "none";
    signInTitle.style.display = "block";
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  }
});

document.getElementById('FirstlogInBtn').addEventListener('click',function(){
  signUpTitle.style.display = "none";
    signInTitle.style.display = "block";
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
})

document.getElementById('secondSignUpBtn').addEventListener('click',function(){
  signUpTitle.style.display = "block";
  signInTitle.style.display = "none";
  signUpForm.style.display = "block";
  signInForm.style.display = "none";
})
// sign in btn click
signInBtn.addEventListener("click", function () {
  if (
    signInMailInput.value != getCookie("mail") ||
    signInPassInput.value != getCookie("password")
  ) {
    signInValidationTxt.style.display = "block";
  } else {
    signInValidationTxt.style.display = "none";
    // console.log("valid data");
    window.location.replace('index2.html');
  }
});


