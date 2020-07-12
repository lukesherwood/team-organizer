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
    this.createForm = document.getElementById('create-event-form')
    this.createForm.innerHTML = this.renderCreateHtml()
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
    <label for="eventName">Event Name:</label><br>
    <input type="text" id="eventName" name="eventName"><br>
    <label for="eventDesc">Event Description:</label><br>
    <input type="text" id="eventDesc" name="eventDesc"><br>
    <label for="location">Location:</label><br>
    <input type="text" id="location" name="location"><br>
    <label for="startTime">Start Time:</label><br>
    <input type="datetime" id="startTime" name="startTime" placeholder="HH:MM DD/MM/YYYY"><br>
    <label for="endTime">End Time:</label><br>
    <input type="datetime" id="endTime" name="endTime" placeholder="HH:MM DD/MM/YYYY"><br>
    <label for="teamId">Select Team:</label><br>
    <select id="teamId" name="teamId">
    </select><br>
    <input type="submit" id='create-event-submit' value="Submit">`
  }
}
