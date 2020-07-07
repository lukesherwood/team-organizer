class EventAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/events'
  }

  createEvent (eventName, eventDesc, location, startTime, endTime, teamId) {
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
  }
}
