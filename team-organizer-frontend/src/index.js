const base_url = "http://localhost:3000";

fetch(`${base_url}/events`)
  .then((response) => response.json())
  .then((object) => renderEvents(object));

fetch(`${base_url}/events/1`)
  .then((response) => response.json())
  .then((object) => renderEvent(object));

function renderEvents(obj) {
  console.log(obj[0].name);
}

function renderEvent(obj){
  console.log(obj.name);
} 
