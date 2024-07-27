import { ipEl, locationEl, timezoneEl, ispEl } from '../app';

export default function (ip, location, timezone, isp) {
  ipEl.textContent = ip;
  locationEl.textContent = location;
  timezoneEl.textContent = `UTC ${timezone}`;
  ispEl.textContent = isp ? isp : "Couldn't Get It";
}
