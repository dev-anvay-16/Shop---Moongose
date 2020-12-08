const hamburger = document.getElementById('cbtn');
const slidingScreen = document.querySelector('.slider');
const close = document.getElementById('close');
const body = document.querySelector('body');

let boo = true;

hamburger.addEventListener('click' , () => {
       slidingScreen.classList.toggle('sactive');
       body.style.overflow = "hidden";
});
close.addEventListener('click' , () => {
         slidingScreen.classList.remove('sactive');
         body.style.overflowX = "hidden";
         body.style.overflowY = 'scroll';
});