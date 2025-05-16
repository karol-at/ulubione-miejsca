const loginForm = {
  username: document.getElementById("login-username"),
  password: document.getElementById("login-password"),
  submit: document.getElementById("login-submit"),
};
const registerForm = {
  username: document.getElementById("register-username"),
  password: document.getElementById("register-password"),
  repassword: document.getElementById("register-repassword"),
  submit: document.getElementById("register-submit"),
};
const formError = document.getElementById("form-error-alert");
const loginOverlay = document.getElementById("login-overlay");

registerForm.submit.onclick = async (e) => {
  if (
    registerForm.username.value == "" ||
    registerForm.password.value == "" ||
    registerForm.repassword.value == ""
  ) {
    formError.style.display = "block";
    formError.innerText = "Fill out all register fields";
    return;
  }
  if (registerForm.password.value != registerForm.repassword.value) {
    formError.style.display = "block";
    formError.innerText = "Passwords must match";
    return;
  }

  const res = await fetch(
    "/register",
    {
      method: "POST",
      body: JSON.stringify({
        username: registerForm.username.value,
        password: registerForm.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());
  switch (res.status) {
    case "ok":
      loginOverlay.style.display = "none";
      break;
    case "nazwa zajęta":
      formError.innerText = "Usenrname taken";
  }
};

loginForm.submit.onclick = async (e) => {
  if (
    loginForm.username.value == "" ||
    loginForm.password.value == ""
  ) {
    formError.style.display = "block";
    formError.innerText = "Fill out all login fields";
    return;
  }

  const res = await fetch(
    "/login",
    {
      method: "POST",
      body: JSON.stringify({
        username: loginForm.username.value,
        password: loginForm.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json());
  switch (res.status) {
    case "ok":
      loginOverlay.style.display = "none";
      break;
    case "brak w bazie":
      formError.innerText = "Incorrect login credentials";
  }
  displayPlaces().catch()
};
