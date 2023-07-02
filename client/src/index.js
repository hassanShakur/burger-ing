import * as api from './modules/api.js';
import * as view from './modules/view.js';

import './style.css';
import './modules/mobileMenuToggler.js';

window.addEventListener('DOMContentLoaded', async () => {
  const burgers = await api.getMeals();
  view.renderMeals(burgers);
});
