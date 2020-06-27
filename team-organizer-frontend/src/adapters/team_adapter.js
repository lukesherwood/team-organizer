class TeamAdapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/teams'
  }

  getTeams () { // instance method
    return fetch(this.baseUrl)
      .then((response) => response.json())
      // .then((object) => object.forEach((obj) => createTeam(obj)))
  }
}
