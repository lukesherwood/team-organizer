const base_url = "http://localhost:3000";

fetch(`${base_url}/events`)
  .then((response) => response.json())
  .then((object) => object.forEach((obj) => createEvent(obj)));

// fetch(`${base_url}/events/1`)
//   .then((response) => response.json())
//   .then((object) => renderEvent(object));

function createEvent(data) {
  //create JS event class and then pass to render function
  renderEvent(data);
}

function renderEvent(obj) {
  //this should take a JS class instance and create html to be displayed on DOM
  const list = document.getElementById("event-list");
  const listItem = document.createElement("li");
  listItem.className = "event-list-item";
  listItem.textContent = obj.name;

  list.appendChild(listItem);
}
