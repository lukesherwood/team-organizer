class Players {
  constructor () {
    this.adapter = new UserAdapter()
  }

  static eventListenerAndBindings () { // need to change this back to non static as you can't call this.othermethods
    const addPlayerButtons = document.querySelectorAll('.add-player-button')
    for (const button of addPlayerButtons) {
      button.addEventListener('click', () => {
        event.preventDefault()
        this.playersContainer = event.target.parentNode.children[4] // this is the ul container for players
        this.playersContainer.innerHTML += `<br>
        <label for="playerName">Enter your Name:</label><br>
        <input type="text" id="playerName" name="playerName"><br>
        <label for="email">Enter your Email:</label><br>
        <input type="text" id="email" name="email"><br>
        <input type="submit" id='create-player-submit' value="Submit">
        <br>`
      })
    }
  }
}
