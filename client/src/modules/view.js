import { getImage } from './api.js';

const mealsContainer = document.querySelector('main');

export const renderCategory = (category) => {
  const categoryMarkup = category.map(
    (meal) => `
        <div class="item">
            <img src="${getImage(meal.image)}" alt="${meal.name}">
            <p>${meal.name}</p>
        </div>
    `,
  ).join('');

  return categoryMarkup;
};

export const renderMeals = (meals) => {
  const mealsMarkup = meals.map(
    (category) => `
        <section>
            <h3>${category[0].category} menu</h3>
            <div class="content">
                ${renderCategory(category)}
            </div>
        </section>
    `,
  ).join('');

  mealsContainer.innerHTML = mealsMarkup;
};
