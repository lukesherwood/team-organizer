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
    this.renderButtons()
    this.eventListenerAndBindings()
  }

  renderButtons () {
    this.renderDeleteButton()
    this.renderEventInfoButton()
    this.renderUpdateButton()
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

  renderDeleteButton () {
    this.buttonContainer = document.createElement('div')
    const event = document.getElementById(`event${this.id}-div`)
    this.buttonContainer.id = `event${this.id}-delete-button-div`
    this.buttonContainer.className = 'float-right btn-group'
    this.buttonContainer.innerHTML = `<button class='btn btn-outline-danger btn-sm event-delete-button' id="event-${this.id}delete-event-button">Delete</button>`
    event.prepend(this.buttonContainer)
  }

  renderEventInfoButton () {
    this.eventInfoButton = document.createElement('button')
    this.eventInfoButton.id = `event${this.id}-link`
    this.eventInfoButton.innerText = 'More Info'
    this.eventInfoButton.className = 'btn btn-outline-primary btn-sm float-right'
    this.buttonContainer.appendChild(this.eventInfoButton)
  }

  renderUpdateButton () {
    this.eventUpdateButton = document.createElement('button')
    this.eventUpdateButton.id = `event-${this.id}update-event-button`
    this.eventUpdateButton.className = 'btn btn-outline-warning btn-sm event-update-button'
    this.eventUpdateButton.innerText = 'Update'
    this.buttonContainer.appendChild(this.eventUpdateButton)
  }

  eventListenerAndBindings () {
    this.eventLinks = document.getElementById(`event${this.id}-link`)
    this.eventLinks.addEventListener('click', () => {
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
          eventInfo.parentNode.remove()
        })
      }
    })
    const updateButton = document.getElementById(`event-${this.id}update-event-button`)
    updateButton.addEventListener('click', () => {
      if (this.eventInfoContainer) {
        this.eventLinks.click() // closes more info if open
      }
      this.renderUpdateForm()
    })
  }

  renderUpdateForm () {
    const event = document.getElementById(`event${this.id}-div`)
    this.updateForm = document.getElementById(`event${this.id}-update-form-container`) || document.createElement('div')
    this.updateForm.className = 'card'
    this.updateForm.id = `event${this.id}-update-form-container`
    this.updateForm.innerHTML = this.updateFormHtml()
    event.appendChild(this.updateForm)
    this.updateEventListeners()
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

  updateEventListeners () {
    const closeUpdateFormButton = document.getElementById(`close-event${this.id}-create-form`)
    closeUpdateFormButton.addEventListener('click', () => {
      this.updateForm.innerHTML = ''
    })
    this.updateEventForm = document.getElementById(`update-event${this.id}-form`)
    this.updateEventForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.processUpdateEventForm()
    })
  }

  processUpdateEventForm () {
    const eventName = document.getElementById('eventName')
    const eventDesc = document.getElementById('eventDesc')
    const location = document.getElementById('location')
    const startTime = document.getElementById('startTime')
    const endTime = document.getElementById('endTime')
    this.adapter.updateEvent(eventName.value, eventDesc.value, location.value, startTime.value, endTime.value, this.team.id, this.id).then((event) => {
      const oldEventCard = document.getElementById(`event${this.id}-div`)
      oldEventCard.parentNode.remove() // delete old event card
      const updatedEvent = new Event(event) // create new event for dom
      this.eventLinks.click() // open more info
    })
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
      if (n === 3) { // ternary here?
        return n + '0'
      } else {
        return n < 10 ? '0' + n : n
      }
    }
    function convertHours (hour) {
      if (hour < 12) { // ternary here?
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

  updateFormHtml () {
    return `
    <div class="card-body">
    <form id='update-event${this.id}-form'>
    <div class="form-group">
    <label for="eventName">Event Name:</label>
    <input type="text" id="eventName" class="form-control" name="eventName" value="${this.name}"required>
    </div>
    <div class="form-group">
    <label for="eventDesc">Event Description:</label>
    <input type="text" id="eventDesc" class="form-control" name="eventDesc" value="${this.description}">
    </div>
    <div class="form-group">
    <label for="location">Location:</label>
    <input type="text" id="location" class="form-control" name="location" value="${this.location}" required>
    </div>
    <div class="form-group">
    <label for="startTime">Start Time:</label>
    <input type="datetime" id="startTime" class="form-control" name="startTime" value="${this.convertDateTime(this.startTime)}" required>
    </div>
    <div class="form-group">
    <label for="endTime">End Time:</label>
    <input type="datetime" id="endTime" class="form-control" name="endTime" value="${this.convertDateTime(this.endTime)}" required>
    </div>
    <input type="submit" id='update-event-submit' class="btn btn-outline-primary mb-2" value="Update">
    <button class='btn btn-outline-danger' style='float:right;' id="close-event${this.id}-create-form">Close</button>
    </form>
    </div>
    `
  }
}
