import { getImage } from './api.js';

import crossClosePopupImg from '../../images/close.png';
import arrowClosePopup from '../../images/back.png';

const mealsContainer = document.querySelector('main');
const popupContainer = document.querySelector('.backdrop');

export const renderCategory = (category) => {
  const categoryMarkup = category
    .map(
      (meal, index) => `
        <div class="item" id="meal" data-id="${index}" data-category="${
  meal.category
}">
            <img src="${getImage(meal.image)}" alt="${meal.name}">
            <p>${meal.name}</p>
        </div>
    `,
    )
    .join('');

  return categoryMarkup;
};

export const renderMeals = (meals) => {
  const mealsMarkup = meals
    .map(
      (category, index) => `
        <section data-category="${index}">
            <h3>${category[0].category} menu</h3>
            <div class="content">
                ${renderCategory(category)}
            </div>
        </section>
    `,
    )
    .join('');

  mealsContainer.innerHTML = mealsMarkup;
};

const generatePopupMarkup = (meal) => `
  <div class="popup">
    <div class="back">
      <img src="${arrowClosePopup}" id="back-arrow" alt="Go back">
      <img src="${crossClosePopupImg}" id="back-cross" alt="Go back">
    </div>
    <div class="popup-img">
      <img src="${getImage(meal.image)}" alt="${meal.name}" />
    </div>
    <div class="meal">
      <h3>${meal.name}</h3>
      <div class="prices">
        ${meal.prices
    .map((price) => {
      const mealPrices = Object.entries(price);
      return `
            <div class="price">
              <span class="amount">${mealPrices[0][0]}</span>
              <span class="value">Ksh. ${mealPrices[0][1]}</span>
            </div>
          `;
    })
    .join('')}
      </div>

      <div class="description">
        <p>
          ${meal.description}
        </p>
        <p class="combo">
          ${meal.bundle}
        </p>
      </div>
    </div>
  </div>
`;

export const renderPopup = (meal, burgers) => {
  const mealCategoryId = +meal.closest('section').dataset.category;
  const mealId = +meal.dataset.id;

  const mealData = burgers[mealCategoryId][mealId];
  const popupMarkup = generatePopupMarkup(mealData);
  popupContainer.classList.add('show-popup');
  popupContainer.innerHTML = popupMarkup;
};

export const hidePopup = () => {
  popupContainer.classList.remove('show-popup');
};
