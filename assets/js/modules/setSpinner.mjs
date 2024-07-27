import { ipEl, locationEl, timezoneEl, ispEl } from '../app';

export default function () {
  const spinnerHTML = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;
  ipEl.innerHTML = spinnerHTML;
  locationEl.innerHTML = spinnerHTML;
  timezoneEl.innerHTML = spinnerHTML;
  ispEl.innerHTML = spinnerHTML;
}
