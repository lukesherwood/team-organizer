class Event {
  constructor (eventJSON, teamName) {
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    this.teamName = teamName
    this.renderEvent()
  }

  renderEvent () {
    const team = document.getElementById(`${this.teamName}-events-list`)
    const event = document.createElement('li')
    event.className = 'event-list-item'
    event.textContent = `${this.name}`
    team.appendChild(event)
  }
}
