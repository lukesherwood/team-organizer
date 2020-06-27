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
        object.forEach((obj) => this.teams.push(new Team(obj)))
        console.log(this.teams)
      })
      .then(() => {
        this.renderTeam()
      })
  }

  renderTeam (obj) {
  // this should take a JS class instance and create html to be displayed on DOM
    this.teams.forEach((team) => {
      const list = document.getElementById('team-list')
      const listItem = document.createElement('li')
      listItem.className = 'event-list-item'
      listItem.innerHTML = // maybe make this a function?
        `<h2>${team.name}</h2>
        <p>${team.description}</p>
        <h3>Events</h3>
        <ul class='team-events-list id=${team.name}-events-list'>
        <li>Events go here</li>
        </ul>`
      list.appendChild(listItem)
    })
  }
}
