class Players {
  constructor (event) {
    this.adapter = new UserAdapter()
    this.eventListenerAndBindings()
    this.event = event
  }

  eventListenerAndBindings () {
    const addPlayerButtons = document.querySelectorAll('.add-player-button')
    for (const button of addPlayerButtons) {
      button.addEventListener('click', () => {
        event.preventDefault()
        const playersContainer = document.getElementById(`event-${this.event.id}-players-list-container`)
        playersContainer.innerHTML += this.playerFormHtml()
      })
    }
  }

  playerFormHtml () {
    return `<br>
    <label for="playerName">Enter your Name:</label><br>
    <input type="text" id="playerName" name="playerName"><br>
    <label for="email">Enter your Email:</label><br>
    <input type="text" id="email" name="email"><br>
    <input type="submit" id='create-player-submit' value="Submit">
    <br>`
  }
}
