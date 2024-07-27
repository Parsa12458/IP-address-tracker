const API_KEY = 'at_gfMCV5hB8agwXNpY9F7LVIxF0dswH';

const ipEl = document.querySelector('.details__ip');
const locationEl = document.querySelector('.details__location');
const timezoneEl = document.querySelector('.details__timezone');
const ispEl = document.querySelector('.details__isp');
const inputEl = document.querySelector('.header__input');
const submitEl = document.querySelector('.header__submit');

const setSpinner = function () {
  const spinnerHTML = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;
  ipEl.innerHTML = spinnerHTML;
  locationEl.innerHTML = spinnerHTML;
  timezoneEl.innerHTML = spinnerHTML;
  ispEl.innerHTML = spinnerHTML;
};

const setValues = function (ip, location, timezone, isp) {
  ipEl.textContent = ip;
  locationEl.textContent = location;
  timezoneEl.textContent = `UTC ${timezone}`;
  ispEl.textContent = isp ? isp : "Couldn't Get It";
};

const setError = function (err) {
  [ipEl, locationEl, timezoneEl, ispEl].forEach(
    el => (el.textContent = err.message)
  );
};

const fetchUserData = async function () {
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
  } catch (err) {
    // Setting error message
    setError(err);
  }
};

const fetchData = async function (e) {
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
};

const init = function () {
  fetchUserData();
  submitEl.addEventListener('click', fetchData);
};
init();
