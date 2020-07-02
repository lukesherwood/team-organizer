class TeamAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams'
  }

  getTeams () {
    return fetch(this.baseUrl)
      .then((response) => response.json())
  }

  createTeam (teamName, teamDesc) {
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
}
