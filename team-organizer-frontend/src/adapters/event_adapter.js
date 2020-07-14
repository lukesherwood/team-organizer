class EventAdapter {
  constructor () {
    this.baseUrl = `http://localhost:3000/teams/`
  }

  createEvent (eventName, eventDesc, location, startTime, endTime, teamId) {
    this.baseUrl += `${teamId}/events`
    const event = {
      name: eventName,
      description: eventDesc,
      location: location,
      start_time: startTime,
      end_time: endTime,
      team_id: teamId
    }
    return fetch(this.baseUrl, {
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
    this.baseUrl += `${teamId}/events/${eventId}`
    const event = {
      team_id: teamId,
      id: eventId
    }
    return fetch(this.baseUrl, {
      method: 'DELETE',
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
