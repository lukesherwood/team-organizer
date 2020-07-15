class Players {
  constructor (event) {
    this.adapter = new UserAdapter()
    this.eventListenerAndBindings()
    this.event = event // can we remove this and move it to player class?
  }

  eventListenerAndBindings () {
    const addPlayerButtons = document.querySelectorAll('.add-player-button')
    for (const button of addPlayerButtons) {
      button.addEventListener('click', () => {
        event.preventDefault()
        if (this.playerFormContainer) {
          this.playerFormContainer.innerHTML = ''
          button.innerText = 'Sign up for this event'
          this.playerFormContainer = false
        } else {
          this.renderPlayerForm()
          button.innerText = 'Click here to close'
        }
      })
    }
  }

  renderPlayerForm () {
    const playersContainer = document.getElementById(`event${this.event.id}-players-container`)
    this.playerFormContainer = document.getElementById(`event-${this.event.id}-players-form-container`) || document.createElement('div')
    this.playerFormContainer.id = (`event-${this.event.id}-players-form-container`)
    playersContainer.appendChild(this.playerFormContainer)
    this.playerFormContainer.innerHTML = this.playerFormHtml()
    this.playerFormSubmitListener()
  }

  playerFormSubmitListener () {
    const playerFormSubmit = document.querySelectorAll('.player-form')
    for (const submit of playerFormSubmit) {
      submit.addEventListener('submit', () => {
        event.preventDefault()
        this.processPlayerForm()
      })
    }
  }

  processPlayerForm () {
    const playerName = document.getElementById('playerName')
    const email = document.getElementById('email')
    this.adapter.createUsers(playerName.value, email.value, this.event.id).then(player => {
      const newPlayer = new Player(player, this.event.id)
      playerName.value = ''
      email.value = ''
    })
    const addPlayerButton = document.getElementById(`event-${this.event.id}add-player-button`)
    addPlayerButton.click() // closes form
  }

  playerFormHtml () { 
    return `<br> 
    <form class='player-form'>
    <label for="playerName">Enter your Name:</label><br>
    <input type="text" id="playerName" name="playerName"><br>
    <label for="email">Enter your Email:</label><br>
    <input type="text" id="email" name="email"><br>
    <input type="submit" id='create-player-submit' value="Submit">
    </form>
    <br>
    `
  }
}
