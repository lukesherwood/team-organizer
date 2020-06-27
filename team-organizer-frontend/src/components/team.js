class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id
    this.events = teamJSON.events
    this.name = teamJSON.name
    this.description = teamJSON.description
  }
}
