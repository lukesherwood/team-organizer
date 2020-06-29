class Event {
  constructor (eventJSON, teamName) {
    this.id = eventJSON.id
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    this.teamName = teamName
    this.renderEventLink()
    this.eventListenerAndBindings()
  }

  renderEventLink () {
    const team = document.getElementById(`${this.teamName}-events-list`)
    const eventLink = document.createElement('li')
    eventLink.className = 'event-list-item'
    eventLink.innerHTML = `<a href='#' id='event${this.id}-link'>${this.name}</a>`
    team.appendChild(eventLink)
  }

  eventListenerAndBindings () {
    this.eventLinks = document.getElementById(`event${this.id}-link`)
    this.eventLinks.addEventListener('click', this.renderEvent.bind(this))
    // console.log(this.eventLinks[0].innerHTML)
  }

  renderEvent () {
    // need to display event
    const eventLink = document.getElementById(`event${this.id}-link`)
    const eventInfoContainer = document.getElementById(`event${this.id}-info-container`) || document.createElement('div')
    eventInfoContainer.id = `event${this.id}-info-container` // this is a little wasteful, changing ID even if already set
    eventInfoContainer.innerHTML = this.eventInfoHtml()
    eventLink.appendChild(eventInfoContainer)
  }

  eventInfoHtml () {
    return `<p>${this.startTime} - ${this.endTime}<br>${this.description}</p>` // etc
  }
}
