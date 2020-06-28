class Event {
  constructor (eventJSON, teamName) {
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    this.teamName = teamName
    this.renderEvent()
    this.eventListenerAndBindings()
  }

  renderEvent () {
    const team = document.getElementById(`${this.teamName}-events-list`)
    const event = document.createElement('li')
    event.className = 'event-list-item'
    event.innerHTML = `<a href='#' id='${this.name}-event-link'>${this.name}</a>`
    team.appendChild(event)
  }

  eventListenerAndBindings () {
    this.eventLinks = document.getElementById(`${this.name}-event-link`)
    this.eventLinks.addEventListener('click', this.showEvent())
    // console.log(this.eventLinks[0].innerHTML)
  }

  showEvent () {
    console.log('fired') // is firing before I click??
  }
}
