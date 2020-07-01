class TeamAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams'
  }

  getTeams () { // instance method
    return fetch(this.baseUrl)
      .then((response) => response.json())
  }

  createTeam (teamName) {
    const team = {
      name: teamName
    }
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(team)
    })
  }
}
