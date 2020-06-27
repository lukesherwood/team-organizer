const app = new App()

// fetch(`${baseUrl}/events`)
//   .then((response) => response.json())
//   .then((object) => object.forEach((obj) => createEvent(obj)))

// // fetch(`${baseUrl}/events/1`) //works
// //   .then((response) => response.json())
// //   .then((object) => renderEvent(object))

// function createEvent (data) {
//   // create JS event class and then pass to render function
//   renderEvent(data)
// }

// function renderEvent (obj) {
//   // this should take a JS class instance and create html to be displayed on DOM
//   const list = document.getElementById('event-list')
//   const listItem = document.createElement('li')
//   listItem.className = 'event-list-item'
//   listItem.textContent = obj.name

//   list.appendChild(listItem)
// }

// fetch(`${baseUrl}/teams`)
//   .then((response) => response.json())
//   .then((object) => object.forEach((obj) => createTeam(obj)))

// function createTeam (data) {
//   // create JS event class and then pass to render function
//   renderTeam(data)
// }

// function renderTeam (obj) {
//   // this should take a JS class instance and create html to be displayed on DOM
//   const list = document.getElementById('team-list')
//   const listItem = document.createElement('li')
//   listItem.className = 'event-list-item'
//   listItem.textContent = obj.name

//   list.appendChild(listItem)
// }
