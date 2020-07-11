class UserAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/users/'
  }

  createUsers (playerName, email, eventId) { // posting new user to the server
    const user = {
      name: playerName,
      email: email,
      event_id: eventId
    }

    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user })
    }).then(res => res.json())
  }
}

