import fetchUserData from './modules/fetchUserData.mjs';
import fetchData from './modules/fetchData.mjs';
import { renderMap } from './modules/renderMap.mjs';

export const API_KEY = 'at_gfMCV5hB8agwXNpY9F7LVIxF0dswH';
export const ipEl = document.querySelector('.details__ip');
export const locationEl = document.querySelector('.details__location');
export const timezoneEl = document.querySelector('.details__timezone');
export const ispEl = document.querySelector('.details__isp');
export const inputEl = document.querySelector('.header__input');
const submitEl = document.querySelector('.header__submit');

const init = function () {
  fetchUserData();
  renderMap();
  submitEl.addEventListener('click', fetchData);
};
init();
