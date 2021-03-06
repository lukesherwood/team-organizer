class EventAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams/'
  }

  createEvent (eventName, eventDesc, location, startTime, endTime, teamId) {
    const postUrl = this.baseUrl + `${teamId}/events`
    const event = {
      name: eventName,
      description: eventDesc,
      location: location,
      start_time: startTime,
      end_time: endTime,
      team_id: teamId
    }
    return fetch(postUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ event })
    }).then(res => res.json())
      .catch(error => {
        return alert(error.message)
      })
  }

  destroyEvent (teamId, eventId) {
    const destroyUrl = this.baseUrl + `${teamId}/events/${eventId}`
    const event = {
      team_id: teamId,
      id: eventId
    }
    return fetch(destroyUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ event })
    })
  }

  updateEvent (eventName, eventDesc, location, startTime, endTime, teamId, eventId) {
    const patchUrl = this.baseUrl + `${teamId}/events/${eventId}`
    const event = {
      name: eventName,
      description: eventDesc,
      location: location,
      start_time: startTime,
      end_time: endTime,
      team_id: teamId,
      id: eventId
    }
    return fetch(patchUrl, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ event })
    }).then(res => res.json())
      .catch(error => {
        return alert(error.message)
      })
  }
}
