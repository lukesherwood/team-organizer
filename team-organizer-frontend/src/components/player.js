class Player {
  constructor (playerJSON, eventId) {
    this.eventId = eventId
    this.name = playerJSON.name
    // this.email = playerJSON.email
    // this.phoneNumber = playerJSON.phone_number
    this.renderPlayers()
  }

  renderPlayers () {
    this.playersContainer = document.getElementById(`event-${this.eventId}-players-list-container`)
    const playerHtml = `<li>${this.name}</li>`
    this.playersContainer.innerHTML += playerHtml
  }
}
