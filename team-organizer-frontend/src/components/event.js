class Event {
  constructor (eventJSON) {
    this.name = eventJSON.name
    this.startTime = eventJSON.start_time
    this.endTime = eventJSON.end_time
    this.description = eventJSON.description
    this.location = eventJSON.location
    // this.team?
  }

  renderHtml () {
    return `<h3>Events</h3><ul class='team-events-list id=${this.name}-events-list'><li>Events go here</li></ul>`
  }

  renderEvent (events) {
		console.log(events)
  }
}
