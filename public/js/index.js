import { signup } from "./signup.js";
import { login, logout } from "./login.js";
import { alert } from "./alert.js";

const loginForm = document.querySelector("#form--login");
const signupForm = document.querySelector("#form--signup");
const logoutBtn = document.querySelector("#btn--logout");

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.querySelector("#username_email").value;
        const password = document.querySelector("#password").value;
        login(userId, password);
    })
}
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(document.querySelector("#club--select"));
        const userData = {
            username: document.querySelector("#username").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            confirmPassword: document.querySelector("#password--confirm").value,
            club: document.querySelector("#club--select").value,
            role: document.querySelector("#role--select").value
        }
        if (userData.password !== userData.confirmPassword)
            return alert('Passwords don\'t match', 'failure');
        signup(userData);
    })
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        logout();
    })
}