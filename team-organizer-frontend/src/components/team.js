class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id
    this.name = teamJSON.name
    this.description = teamJSON.description
    this.events = teamJSON.events
  }

  renderHtml () {
    return `<h2>${this.name}</h2>
    <p>${this.description}</p>
    <h3>Events</h3>
    <ul class='team-events-list' id='${this.teamNameToId()}-events-list'></ul>`
  }

  createEvents (events) {
    events.forEach(element => { this.events.push(new Event(element, this.teamNameToId())) })
  }

  teamNameToId () {
    return this.name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  }
}
