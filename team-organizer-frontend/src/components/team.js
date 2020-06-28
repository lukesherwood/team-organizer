class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id
    this.events = teamJSON.events
    this.name = teamJSON.name
    this.description = teamJSON.description
  }

  renderHtml () {
    return `<h2>${this.name}</h2>
    <p>${this.description}</p>`
  }
}
