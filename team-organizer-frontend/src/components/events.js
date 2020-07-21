class Events { // this class handles the create event form
  constructor () {
    this.adapter = new EventAdapter()
    this.teamAdapter = new TeamAdapter()
    this.eventListenerAndBindings()
  }

  // event listeners

  eventListenerAndBindings () {
    this.createEventButtonListener()
  }

  createEventButtonListener () {
    this.createEventButton = document.getElementById('create-event-button')
    this.createEventButton.addEventListener('click', () => {
      this.renderCreateEventForm()
      this.closeCreateFormListener()
    })
  }

  closeCreateFormListener () {
    const closeEventFormButton = document.getElementById('close-event-create-form')
    closeEventFormButton.addEventListener('click', () => {
      this.eventFormContainer.innerHTML = ''
    })
  }

  // Create event form render functions

  renderCreateEventForm () {
    this.eventFormContainer = document.getElementById('form-container')
    this.eventFormContainer.innerHTML = this.CreateEventFormHtml()
    this.createEventForm = document.getElementById('create-event-form')
    this.addTeamOptionsToForm()
    this.createEventForm.addEventListener('submit', (event) => {
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

  CreateEventFormHtml () {
    return `
    <div class="card">
    <h4 class="card-header text-white" style="background-color: #266563; opacity: 75%; padding: 2px;">Create a New Event
    <button class='btn btn-danger' style='float:right;' id="close-event-create-form">Close</button></h4>
    <div class="card-body">
    <form id='create-event-form'>
    <div class="form-group">
    <label for="teamId">Select Team:</label>
    <select id="teamId" class="form-control" name="teamId" required>
    <option selected>Choose...</option>
    </select>
    </div>
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
    <input type="submit" id='create-event-submit' class="btn btn-outline-primary mb-2" value="Submit">
    </form>
    </div>
    </div>
    `
  }

  // Process create form functions

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
    })
    document.getElementById('close-event-create-form').click() // collapses form
  }
}
