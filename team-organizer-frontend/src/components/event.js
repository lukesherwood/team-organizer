class Event {
  constructor (eventJSON) {
    this.id = eventJSON.id
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    this.team = eventJSON.team
    this.rawPlayers = eventJSON.players
    this.players = []
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
    eventLinks.addEventListener('click', () => {
      if (this.eventInfoContainer) {
        this.eventInfoContainer.innerHTML = ''
        this.eventInfoContainer = false
      } else {
        this.renderEvent()
      }
    })
  }

  renderEvent () {
    const eventLinkDiv = document.getElementById(`event${this.id}-div`)
    this.eventInfoContainer = document.createElement('div')
    this.eventInfoContainer.id = `event${this.id}-info-container`
    this.eventInfoContainer.innerHTML = this.eventInfoHtml()
    eventLinkDiv.appendChild(this.eventInfoContainer)
    this.renderPlayersHtml()
    this.createPlayers()
  }

  renderPlayersHtml () {
    this.eventInfoContainer = document.getElementById(`event${this.id}-info-container`)
    this.eventInfoContainer.innerHTML += `<h4>Players</h4>
      <ul id="event-${this.id}-players-list-container"></ul><br>
      <button class='add-player-button' id="event-${this.id}-add-player-button">Sign up for this event</button><br>`
  }

  createPlayers () {
    this.rawPlayers.forEach(player => {
      this.players.push(new Player(player, this.id))
    })
  }

  eventInfoHtml () {
    return `<p>${this.startTime} - ${this.endTime} </p>
    <p>${this.location}</p>
    <p>${this.description}</p>
    `
  }
}
