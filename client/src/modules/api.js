import axios from 'axios';
import { MEALS_URL, IMAGE_URL } from './urls.js';

export const getMeals = async () => {
  const response = await axios.get(MEALS_URL);
  const { burgers } = response.data.data;
  return burgers;
};

export const getImage = (mealName) => `${IMAGE_URL}/${mealName}`;
