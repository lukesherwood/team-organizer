class Players {
  constructor () {
    this.adapter = new UserAdapter()
    this.eventListenerAndBindings()
  }

  eventListenerAndBindings () {
    const addPlayerButtons = document.querySelectorAll('.add-player-button')
    for (const button of addPlayerButtons) {
      button.addEventListener('click', () => {
        event.preventDefault()
        // need to render form
        console.log('player added')
      })
    }
  }
}
