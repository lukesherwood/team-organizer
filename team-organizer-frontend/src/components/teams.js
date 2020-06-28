class Teams {
  constructor () {
    this.teams = []
    this.adapter = new TeamAdapter()
    // this.bindEventListeners()
    this.loadTeams()
  }

  loadTeams () {
    this.adapter
      .getTeams()
      .then(object => {
        object.forEach((obj) => this.teams.push(new Team(obj)))
      })
      .then(() => {
        this.renderTeam()
      })
  }

  renderTeam () {
    const list = document.getElementById('team-list')
    this.teams.forEach((team) => {
      const listItem = document.createElement('li')
      listItem.className = 'event-list-item'
      listItem.innerHTML = team.renderHtml()
      list.appendChild(listItem)
      console.log(team.events)
    })
  }
}
