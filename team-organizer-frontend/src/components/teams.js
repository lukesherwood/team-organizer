class Teams {
  constructor () {
    this.teams = []
    this.adapter = new TeamAdapter()
    // this.bindEventListeners()
    console.log(this)
    this.loadTeams()
  }

  loadTeams () {
    this.adapter
      .getTeams()
      .then(object => {
        object.forEach((obj) => this.teams.push(obj))
      })
      .then(() => {
        this.renderTeam()
      })
  }

  createTeam () {
    // should create JS class
    this.renderTeam() // should pass the JS class obj
  }

  renderTeam (obj) {
  // this should take a JS class instance and create html to be displayed on DOM
    this.teams.forEach((team) => {
      const list = document.getElementById('team-list')
      const listItem = document.createElement('li')
      listItem.className = 'event-list-item'
      listItem.textContent = team.name
      list.appendChild(listItem)
    })
  }
}
