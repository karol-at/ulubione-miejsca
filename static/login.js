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

registerForm.submit.onclick = async (e) => {
  if (
    registerForm.username.value == "" ||
    registerForm.password.value == "" ||
    registerForm.repassword.value == ""
  ) {
    formError.innerText = "Fill out all register fields";
  }
  if (registerForm.password.value != registerForm.repassword.value) {
    formError.innerText = "Passwords must match";
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
  //TODO: Add response handling
};

loginForm.submit.onclick = async (e) => {
  if (
    loginForm.username.value == "" ||
    loginForm.password.value == ""
  ) {
    formError.innerText = "Fill out all login fields"
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
};
