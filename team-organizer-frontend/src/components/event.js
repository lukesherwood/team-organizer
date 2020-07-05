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
    this.eventLinks = document.getElementById(`event${this.id}-link`)
    this.eventLinks.addEventListener('click', this.renderEvent.bind(this))
    this.createEventButton = document.getElementById('create-event-button')
    this.createEventButton.addEventListener('click', this.renderCreateEventForm.bind(this))
  }

  renderEvent () {
    const eventLinkDiv = document.getElementById(`event${this.id}-div`)
    const eventInfoContainer = document.getElementById(`event${this.id}-info-container`) || document.createElement('div') // able to make this collapsible?
    eventInfoContainer.id = `event${this.id}-info-container` // this is a little wasteful, changing ID even if already set
    eventInfoContainer.innerHTML = this.eventInfoHtml()
    eventLinkDiv.appendChild(eventInfoContainer)
  }

  renderCreateEventForm () {
    const container = document.getElementById('create-event-form-container')
    const form = document.getElementById('create-event-form') || document.createElement('form') // able to make this collapsible?
    form.id = 'create-event-form'
    form.innerHTML = this.renderCreateHtml()
    container.appendChild(form)
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.processCreateEventForm()
    })
  }

  processCreateEventForm () {
    const eventName = document.getElementById('eventName').value
    const eventDesc = document.getElementById('eventDesc').value
    console.log(`created event ${eventName} - ${eventDesc}`)
  }

  eventInfoHtml () {
    return `<p>${this.startTime} - ${this.endTime} </p>
    <p>${this.location}</p>
    <p>${this.description}</p>
    `
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
    <input type="datetime" id="startTime" name="startTime"><br>
    <label for="endTime">End Time:</label><br>
    <input type="datetime" id="endTime" name="endTime"><br>
    <input type="submit" id='create-event-submit' value="Submit">` // will need selector for team/creator?
  }
}
