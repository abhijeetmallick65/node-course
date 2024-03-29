console.log("check");
window.addEventListener("click", () => {
  document.querySelectorAll("h1").forEach((e) => {
    e.style.color = "blue";
  });
});

function fetchCallback(location) {
  return fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const button = document.querySelector("button");
const messageOne = document.querySelector("#message-1");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (!location) {
    return (messageOne.textContent = "Please enter a valid location");
  }
  messageOne.textContent = `Loading weather for ${location}...`;

  fetchCallback(location)
    .then((res) => {
      if (res.error) {
        return (messageOne.textContent = res.error);
      }
      const { address, forecast, location } = res;
      messageOne.textContent = `Address : ${address}. Forecast : ${forecast}. Location : ${location}`;

      return fetch(`https://source.unsplash.com/360x400/?${address},weather`);
    })
    .then((res) => {
      const img = `<img src = "${res.url}" alt = "image not found.">`;

      const main = document.querySelector(".main-content");

      main.querySelector("img")?.remove();

      main.insertAdjacentHTML("beforeend", img);
    })
    .catch((err) => console.log(err));
});
