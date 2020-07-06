class TeamAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams'
    this.eventsUrl = 'http://localhost:3000/events' // should create own adaptor for events?
  }

  getTeams () {
    return fetch(this.baseUrl)
      .then((response) => response.json())
  }

  createTeam (teamName, teamDesc) { // posting new team to the server
    const team = {
      name: teamName,
      description: teamDesc
    }

    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ team })
    }).then(res => res.json())
  }

  createEvent (eventName, eventDesc, location, startTime, endTime, teamId) { // why is this posting 3 times?
    const event = {
      name: eventName,
      description: eventDesc,
      location: location,
      start_time: startTime,
      end_time: endTime,
      team_id: teamId
    }
    return fetch(this.eventsUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ event })
    }).then(res => res.json())
  }
}
