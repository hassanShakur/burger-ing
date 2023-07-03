import * as api from './modules/api.js';
import * as view from './modules/view.js';

import './style.css';
import './modules/mobileMenuToggler.js';

const mealsContainer = document.querySelector('main');
const popupContainer = document.querySelector('.backdrop');

let burgers;

window.addEventListener('DOMContentLoaded', async () => {
  burgers = await api.getMeals();
  view.renderMeals(burgers);
});

mealsContainer.addEventListener('click', (e) => {
  const meal = e.target.closest('#meal');
  if (!meal) return;

  view.renderPopup(meal, burgers);
});

popupContainer.addEventListener('click', (e) => {
  const isClosePopupIcon = e.target.closest('.back');
  if (!isClosePopupIcon) return;

  view.hidePopup();
});

//  (font-family: "Flame-Sans" style:normal weight:400 stretch:100 src index:0): status=2152398878 source: https://burgerking.ke/assets/fonts/FlameSans-Regular.woff2
