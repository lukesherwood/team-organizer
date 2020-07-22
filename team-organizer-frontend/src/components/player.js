class Player { // Renders players and manages player delete
  constructor (playerJSON, eventId) {
    this.eventId = eventId
    this.name = playerJSON.name
    this.id = playerJSON.id
    this.adapter = new UserAdapter()
    this.email = playerJSON.email
    // this.phoneNumber = playerJSON.phone_number
    this.renderPlayers()
    this.renderDeleteButton()
    this.eventListenerAndBindings()
  }

  // Event Listeners

  eventListenerAndBindings () {
    this.deleteButtonListener()
  }

  deleteButtonListener () {
    const deleteButton = document.getElementById(`event-${this.eventId}-player-${this.id}delete-player-button`)
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove this player?')) {
        this.adapter.destroyPlayer(this.eventId, this.id).then(() => {
          const player = document.getElementById(`event-${this.eventId}-player-${this.id}`)
          player.parentNode.removeChild(player)
        })
      }
    })
  }

  // render player functions

  renderPlayers () {
    this.playersContainer = document.getElementById(`event-${this.eventId}-players-list-container`)
    const playerHtml = document.createElement('li')
    playerHtml.id = `event-${this.eventId}-player-${this.id}`
    playerHtml.className = 'list-group-item'
    playerHtml.style = 'padding:5px;'
    playerHtml.innerText = this.name
    this.playersContainer.appendChild(playerHtml)
  }

  renderDeleteButton () {
    const player = document.getElementById(`event-${this.eventId}-player-${this.id}`)
    player.innerHTML += `<button class='btn btn-outline-danger btn-sm float-right' id="event-${this.eventId}-player-${this.id}delete-player-button">X</button>`
  }
}
