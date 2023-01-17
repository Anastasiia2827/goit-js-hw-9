import { Notify } from "notiflix";

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => { if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  });
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { amount, delay, step } = e.target.elements;
  let valueDelay = +delay.value;
  for (let i = 1; i <= amount.value; i += 1) {
      createPromise(i,valueDelay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    valueDelay += +step.value
  }
  e.target.reset()
}

  
  
  
  
  
  
  


