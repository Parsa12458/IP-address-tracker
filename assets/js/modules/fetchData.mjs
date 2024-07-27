import setError from './setError.mjs';
import setSpinner from './setSpinner.mjs';
import setValues from './setValues.mjs';
import { inputEl, API_KEY } from '../app';

export default async function (e) {
  try {
    e.preventDefault();

    if (!inputEl.value) return;
    setSpinner();

    let res;
    let data;

    // If input is IP
    if (Number.isFinite(+inputEl.value.at(-1))) {
      const ip = inputEl.value;

      res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      data = await res.json();
    }

    // If input is Domain
    if (!Number.isFinite(+inputEl.value.at(-1))) {
      const domain = inputEl.value;

      res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${domain}`
      );
      data = await res.json();
    }

    // throwing error for uncaught promise error
    if (!res.ok)
      throw new Error(
        `Something is wrong, check your input again! (${res.status})`
      );

    // Clearing Input
    inputEl.value = '';
    inputEl.blur();

    // Getting data
    const { ip } = data;
    const location = `${data.location.region}, ${data.location.city}`;
    const { timezone } = data.location;
    const { isp } = data;
    const { lat, lng } = data.location;

    // Setting values
    setValues(ip, location, timezone, isp);
  } catch (err) {
    // Setting error message
    setError(err);
  }
}
