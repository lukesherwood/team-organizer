class UserAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/users'
  }

  createUsers (playerName, email, eventId) { // posting new user to the database
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
      .catch(error => {
        return alert(error.message)
      })
  }

  destroyPlayer (eventId, playerId) {
    const user = {
      event_id: eventId,
      id: playerId
    }
    const deleteUrl = this.baseUrl + `/${playerId}`
    return fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ user })
    })
  }
}
