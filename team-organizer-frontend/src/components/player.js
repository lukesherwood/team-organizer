class Player {
  constructor (playerJSON, eventId) {
    this.eventId = eventId
    this.name = playerJSON.name
    this.id = playerJSON.id
    this.adapter = new UserAdapter()
    // this.email = playerJSON.email
    // this.phoneNumber = playerJSON.phone_number
    this.renderPlayers()
    this.renderDeleteButton()
    this.eventListenerAndBindings()
  }

  renderPlayers () {
    this.playersContainer = document.getElementById(`event-${this.eventId}-players-list-container`)
    const playerHtml = document.createElement('li')
    playerHtml.id = `player-${this.id}`
    playerHtml.className = 'list-group-item'
    playerHtml.innerText = this.name
    this.playersContainer.appendChild(playerHtml)
  }

  renderDeleteButton () {
    const player = document.getElementById(`player-${this.id}`)
    player.innerHTML += `<button class='btn btn-outline-danger btn-sm delete-player-button' id="player-${this.id}delete-player-button">X</button>`
  }

  eventListenerAndBindings () {
    const deleteButton = document.getElementById(`player-${this.id}delete-player-button`)
    deleteButton.addEventListener('click', () => {
      this.adapter.destroyPlayer(this.eventId, this.id).then(() => {
        const player = document.getElementById(`player-${this.id}`)
        // need to delete player from event.players
        player.parentNode.removeChild(player)
      })
    })
  }
}
