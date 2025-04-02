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

//TODO: Add proper handling for invalid inputs
registerForm.submit.onclick = async (e) => {
  if (
    registerForm.username.value == "" ||
    registerForm.password.value == "" ||
    registerForm.repassword.value == ""
  ) return;
  if (registerForm.password.value != registerForm.repassword.value) return;

  const res = await fetch(
    "/register",
    {
      method: "POST",
      body: JSON.stringify({
        //TODO: Remove the need for user_id on the backend
        user_id: 1,
        username: registerForm.username.value,
        password: registerForm.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  //TODO: Add response handling
};
