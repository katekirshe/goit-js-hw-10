import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = event.target.elements;
    const delay = data.delay.value;
    const state = data.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    }).then(value => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${value}ms`
        });
    })
        .catch(error => {
            iziToast.error({
                message: `❌ Rejected promise in ${error}ms`
            });
        });
})