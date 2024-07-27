import setError from './setError.mjs';
import setSpinner from './setSpinner.mjs';
import setValues from './setValues.mjs';
import setView from './setView.mjs';
import { API_KEY } from '../app';

export default async function () {
  try {
    setSpinner();

    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);

    // Getting data
    const { ip } = data;
    const location = `${data.location.region}, ${data.location.city}`;
    const { timezone } = data.location;
    const { isp } = data;
    const { lat, lng } = data.location;

    // Setting values
    setValues(ip, location, timezone, isp);

    // Setting view of map and marker on map
    setView(lat, lng);
  } catch (err) {
    // Setting error message
    setError(err);
  }
}
