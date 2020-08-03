class TeamAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams'
  }

  getTeams () { // getting all teams from database
    return fetch(this.baseUrl)
      .then((response) => response.json())
  }

  createTeam (teamName, teamDesc) { // posting new team to the database
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
      .catch(error => {
        return alert(error.message)
      })
  }

  destroyTeam (teamId) { // deleting team from database
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
