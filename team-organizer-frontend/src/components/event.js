class Event {
  constructor (eventJSON) {
    this.id = eventJSON.id
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    this.team = eventJSON.team
    this.renderEventLink()
    this.eventListenerAndBindings()
  }

  renderEventLink () {
    const team = document.getElementById(`team${this.team.id}-events-list`)
    const eventLink = document.createElement('li')
    eventLink.id = `event${this.id}-div`
    eventLink.innerHTML = `<a href='#' id='event${this.id}-link'>${this.name}</a>`
    eventLink.className = 'event-list-item'
    team.appendChild(eventLink)
  }

  eventListenerAndBindings () {
    const eventLinks = document.getElementById(`event${this.id}-link`)
    eventLinks.addEventListener('click', this.renderEvent.bind(this))
  }

  renderEvent () {
    const eventLinkDiv = document.getElementById(`event${this.id}-div`)
    const eventInfoContainer = document.getElementById(`event${this.id}-info-container`) || document.createElement('div') // able to make this collapsible?
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
