class Events {
  constructor () {
    this.adapter = new EventAdapter()
    this.teamAdapter = new TeamAdapter()
    this.eventListenerAndBindings()
  }

  eventListenerAndBindings () {
    this.createEventButton = document.getElementById('create-event-button')
    this.createEventButton.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.createForm) { // collapses form if already open
        this.createForm.innerHTML = ''
        this.createEventButton.innerText = 'Create a New Event'
        this.createForm = false
      } else {
        this.renderCreateEventForm()
        this.createEventButton.innerText = 'Click here to close'
      }
    })
  }

  renderCreateEventForm () {
    const eventFormContainer = document.getElementById('form-container') || document.createElement('div')
    eventFormContainer.id = 'form-container'
    const topDiv = document.getElementById('team-list')
    topDiv.prepend(eventFormContainer)
    this.createForm = document.createElement('div')
    this.createForm.innerHTML = this.renderCreateHtml()
    eventFormContainer.appendChild(this.createForm)
    this.addTeamOptionsToForm()
    this.createForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.processCreateEventForm()
    })
  }

  addTeamOptionsToForm () {
    const selectionInput = document.getElementById('teamId')
    this.teamAdapter.getTeams().then((teams) => {
      teams.forEach(team => {
        const option = `<option value=${team.id}>${team.name}</option>`
        selectionInput.innerHTML += option
      })
    })
  }

  processCreateEventForm () {
    const eventName = document.getElementById('eventName')
    const eventDesc = document.getElementById('eventDesc')
    const location = document.getElementById('location')
    const startTime = document.getElementById('startTime')
    const endTime = document.getElementById('endTime')
    const teamId = document.getElementById('teamId')
    this.adapter.createEvent(eventName.value, eventDesc.value, location.value, startTime.value, endTime.value, teamId.value).then(event => {
      const newEvent = new Event(event)
      eventName.value = ''
      eventDesc.value = ''
      location.value = ''
      startTime.value = ''
      endTime.value = ''
      teamId.value = ''
      newEvent.renderEvent()
    })
    document.getElementById('create-event-button').click() // collapses form
  }

  renderCreateHtml () {
    return `
    <div class="card" style="width:49%; float:right;">
    <h4 class="card-header text-white" style="background-color: #266563; opacity: 75%; padding: 2px;">Create a New Event</h4>
    <div class="card-body">
    <form id='create-event-form'>
    <div class="form-group">
    <label for="eventName">Event Name:</label>
    <input type="text" id="eventName" class="form-control" name="eventName" required>
    </div>
    <div class="form-group">
    <label for="eventDesc">Event Description:</label>
    <input type="text" id="eventDesc" class="form-control" name="eventDesc">
    </div>
    <div class="form-group">
    <label for="location">Location:</label>
    <input type="text" id="location" class="form-control" name="location" required>
    </div>
    <div class="form-group">
    <label for="startTime">Start Time:</label>
    <input type="datetime" id="startTime" class="form-control" name="startTime" placeholder="HH:MM DD/MM/YYYY" required>
    </div>
    <div class="form-group">
    <label for="endTime">End Time:</label>
    <input type="datetime" id="endTime" class="form-control" name="endTime" placeholder="HH:MM DD/MM/YYYY" required>
    </div>
    <div class="form-group">
    <label for="teamId">Select Team:</label>
    <select id="teamId" class="form-control" name="teamId" required>
    <option selected>Choose...</option>
    </select>
    </div>
    <input type="submit" id='create-event-submit' class="btn btn-outline-primary mb-2" value="Submit">
    </form>
    </div>
    </div>
    `
  }
}
