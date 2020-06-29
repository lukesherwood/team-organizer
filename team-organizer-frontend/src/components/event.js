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
    const eventLi = document.createElement('li')
    const eventLink = document.createElement('div')
    eventLink.id = `event${this.id}-div`
    eventLink.innerHTML = `<a href='#' id='event${this.id}-link'>${this.name}</a>`
    eventLink.className = 'event-list-item'
    team.appendChild(eventLi)
    eventLi.appendChild(eventLink)
  }

  eventListenerAndBindings () {
    this.eventLinks = document.getElementById(`event${this.id}-link`)
    this.eventLinks.addEventListener('click', this.renderEvent.bind(this))
  }

  renderEvent () {
    // need to display event
    const eventLinkDiv = document.getElementById(`event${this.id}-div`)
    const eventInfoContainer = document.getElementById(`event${this.id}-info-container`) || document.createElement('div')
    eventInfoContainer.id = `event${this.id}-info-container` // this is a little wasteful, changing ID even if already set
    eventInfoContainer.innerHTML = this.eventInfoHtml()
    eventLinkDiv.appendChild(eventInfoContainer)
  }

  eventInfoHtml () {
    return `<p>${this.startTime} - ${this.endTime} </p>
    <p>${this.location}</p>
    <p>${this.description}</p>
    `
  }
}
