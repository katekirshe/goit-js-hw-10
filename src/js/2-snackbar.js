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
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    }).then(value => {
        iziToast.success({
            message: value,
        });
    })
        .catch(error => {
            iziToast.error({
                message: error
            });
        });
})