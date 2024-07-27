const API_KEY = 'at_gfMCV5hB8agwXNpY9F7LVIxF0dswH';

const ipEl = document.querySelector('.details__ip');
const locationEl = document.querySelector('.details__location');
const timezoneEl = document.querySelector('.details__timezone');
const ispEl = document.querySelector('.details__isp');
const spinnerHTML = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;
ipEl.innerHTML = spinnerHTML;
locationEl.innerHTML = spinnerHTML;
timezoneEl.innerHTML = spinnerHTML;
ispEl.innerHTML = spinnerHTML;

const getUserIP = async function () {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
    );
    const data = await res.json();

    // Getting data from geolocation api
    const ip = data.ip;
    const location = `${data.location.region}, ${data.location.city}`;
    const timezone = `UTC ${data.location.timezone}`;
    const isp = data.isp ? data.isp : "Couldn't Get It";
    const { lat, lng } = data.location;

    // Setting details values
    ipEl.textContent = ip;
    locationEl.textContent = location;
    timezoneEl.textContent = timezone;
    ispEl.textContent = isp;
  } catch (err) {
    // Setting error message
    [ipEl, locationEl, timezoneEl, ispEl].forEach(
      el => (el.textContent = err.message)
    );
  }
};

getUserIP();
