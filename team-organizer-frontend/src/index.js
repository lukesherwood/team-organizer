const base_url = "http://localhost:3000"

fetch(`${base_url}/events`)
.then(response => response.json())
.then(object => console.log(object)) 

fetch(`${base_url}/events/1`)
.then(response => response.json())
.then(object => console.log(object.name))