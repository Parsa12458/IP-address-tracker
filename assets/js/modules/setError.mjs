import { ipEl, locationEl, timezoneEl, ispEl } from '../app';

export default function (err) {
  [ipEl, locationEl, timezoneEl, ispEl].forEach(
    el => (el.textContent = err.message)
  );
}
