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
    this.renderEventInfoButton()
    this.eventListenerAndBindings()
  }

  renderEventLink () {
    const team = document.getElementById(`team${this.team.id}-events-list`)
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    this.eventLink = document.createElement('li')
    this.eventLink.id = `event${this.id}-div`
    this.eventLink.innerHTML = `<h5 class='card-title' id='event${this.id}-title'>${this.name}</h5>`
    this.eventLink.className = 'card-body'
    team.appendChild(cardDiv)
    cardDiv.appendChild(this.eventLink)
  }

  renderEventInfoButton () {
    const event = document.getElementById(`event${this.id}-title`)
    this.eventInfoButton = document.createElement('button')
    this.eventInfoButton.id = `event${this.id}-link`
    this.eventInfoButton.innerText = 'More Info'
    this.eventInfoButton.className = 'btn btn-outline-primary btn-sm float-right'
    event.appendChild(this.eventInfoButton)
  }

  renderDeleteButton () {
    const buttonContainer = document.createElement('div')
    const event = document.getElementById(`event${this.id}-title`)
    buttonContainer.id = `event${this.id}-delete-button-div`
    buttonContainer.className = 'float-right'
    buttonContainer.innerHTML = `&nbsp<button class='btn btn-outline-danger btn-sm event-delete-button' id="event-${this.id}delete-event-button">Delete</button>`
    event.appendChild(buttonContainer)
  }

  eventListenerAndBindings () {
    const eventLinks = document.getElementById(`event${this.id}-link`)
    eventLinks.addEventListener('click', () => {
      if (this.eventInfoContainer) {
        this.eventInfoContainer.innerHTML = ''
        this.eventInfoContainer = false
        this.eventInfoButton.innerText = 'More Info'
      } else {
        this.renderEvent()
        this.eventInfoButton.innerText = 'Less Info'
      }
    })
    const deleteButton = document.getElementById(`event-${this.id}delete-event-button`)
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove this event?')) {
        this.adapter.destroyEvent(this.team.id, this.id).then(() => {
          const eventInfo = document.getElementById(`event${this.id}-div`)
          eventInfo.parentNode.removeChild(eventInfo)
        })
      }
    })
  }

  renderEvent () {
    console.log('fired')
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
    playersInfoContainer.className = 'card'
    playersInfoContainer.id = `event${this.id}-players-container`
    playersInfoContainer.innerHTML = `
      <h5 class="card-header text-white" style="background-color: rgb(38, 101, 122); opacity: 80%; padding: 2px; text-align: center;">Players</h5>
      <ul class="list-group list-group-flush" id="event-${this.id}-players-list-container"></ul>
      <button class='btn btn btn-outline-primary btn-sm add-player-button' id="event-${this.id}add-player-button">Sign up for this event</button>`
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
      if (n === 3) {
        return n + '0'
      } else {
        return n < 10 ? '0' + n : n
      }
    }
    function convertHours (hour) {
      if (hour < 12) {
        return hour + 12
      } else {
        return hour - 12
      }
    }
    const currentDate = new Date(date)
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const day = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    return `${convertHours(hours)}:${pad(minutes)} ${pad(day)}/${pad(month)}/${year}`
  }

  eventInfoHtml () {
    return `<p>${this.convertDateTime(this.startTime)} - ${this.convertDateTime(this.endTime)} </p> 
    <p>${this.location}</p>
    <p>${this.description}</p>
    `
  }
}
