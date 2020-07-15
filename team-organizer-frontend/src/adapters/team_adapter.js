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

  destroyTeam (teamId) {
    const team = {
      id: teamId
    }
    const deleteUrl = this.baseUrl + `/${teamId}`
    return fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ team })
    })
  }
}
