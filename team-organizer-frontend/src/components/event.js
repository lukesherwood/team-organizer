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
    this.adapter = new EventAdapter()
    this.renderEventLink()
    this.renderDeleteButton()
    this.eventListenerAndBindings()
  }

  renderEventLink () {
    const team = document.getElementById(`team${this.team.id}-events-list`)
    this.eventLink = document.createElement('li')
    this.eventLink.id = `event${this.id}-div`
    this.eventLink.innerHTML = `<a href='#' id='event${this.id}-link'>${this.name}</a>`
    this.eventLink.className = 'event-list-item'
    team.appendChild(this.eventLink)
  }

  renderDeleteButton () {
    const buttonContainer = document.createElement('div')
    buttonContainer.id = `event${this.id}-delete-button-div`
    buttonContainer.innerHTML = `<button class='delete-event-button' id="event-${this.id}delete-event-button">Delete this event</button><br>`
    this.eventLink.appendChild(buttonContainer)
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
    const deleteButton = document.getElementById(`event-${this.id}delete-event-button`)
    deleteButton.addEventListener('click', () => {
      this.adapter.destroyEvent(this.team.id, this.id).then(() => {
        const eventInfo = document.getElementById(`event${this.id}-div`)
        eventInfo.parentNode.removeChild(eventInfo)
      })
    })
  }

  renderEvent () {
    this.eventLinkDiv = document.getElementById(`event${this.id}-div`)
    this.eventInfoContainer = document.getElementById(`event${this.id}-info-container`) || document.createElement('div')
    this.eventInfoContainer.id = `event${this.id}-info-container`
    this.eventInfoContainer.innerHTML = this.eventInfoHtml()
    this.eventLinkDiv.appendChild(this.eventInfoContainer)
    this.renderPlayersHtml()
    this.createPlayers()
  }

  renderPlayersHtml () {
    this.eventInfoContainer = document.getElementById(`event${this.id}-info-container`)
    const playersInfoContainer = document.createElement('div')
    playersInfoContainer.id = `event${this.id}-players-container`
    playersInfoContainer.innerHTML = `<h4>Players</h4>
      <ul id="event-${this.id}-players-list-container"></ul><br>
      <button class='add-player-button' id="event-${this.id}add-player-button">Sign up for this event</button><br>`
    this.eventInfoContainer.appendChild(playersInfoContainer)
    new Players(this)
  }

  createPlayers () {
    this.rawPlayers.forEach(player => {
      this.players.push(new Player(player, this.id))
    })
  }

  convertDateTime (date) {
    function pad (n) {
      if (n == 3) {
        return n + '0'
      } else {
        return n < 10 ? '0' + n : n
      }
    }
    const currentDate = new Date(date)
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const day = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    return `${pad(hours)}:${pad(minutes)} ${pad(day)}/${pad(month)}/${year}` // why is this showing pm times as am times?
  }

  eventInfoHtml () {
    return `<p>${this.convertDateTime(this.startTime)} - ${this.convertDateTime(this.endTime)} </p> 
    <p>${this.location}</p>
    <p>${this.description}</p>
    `
  }
}
