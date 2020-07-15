/* eslint-disable semi */
class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id;
    this.name = teamJSON.name;
    this.description = teamJSON.description;
    this.rawEvents = teamJSON.events;
    this.events = []
    this.adapter = new TeamAdapter()
  };

  renderTeam () {
    const list = document.getElementById('team-list');
    const listItem = document.createElement('li');
    listItem.className = 'team-list-item';
    listItem.id = `team${this.id}-item`;
    listItem.innerHTML = this.renderHtml();
    list.appendChild(listItem);
    this.createEvents(this.rawEvents);
    this.renderDeleteButton()
    this.eventListenerAndBindings()
  }

  renderHtml () {
    return `<h2 id='team${this.id}-title'>${this.name}</h2>
    <p>${this.description}</p>
    <h3>Events</h3>
    <ul class='team-events-list' id='team${this.id}-events-list'></ul><br>`
  }

  createEvents (events) {
    events.forEach((event) => {
      this.events.push(new Event(event));
    });
  }

  renderDeleteButton () {
    const buttonContainer = document.createElement('div')
    buttonContainer.id = `team${this.id}-delete-button-div`
    buttonContainer.innerHTML = `<button class='delete-team-button' id="team-${this.id}delete-event-button">Delete this team</button><br>`
    const teamTitle = document.getElementById(`team${this.id}-title`)
    teamTitle.appendChild(buttonContainer)
  }

  eventListenerAndBindings () {
    const deleteButton = document.getElementById(`team-${this.id}delete-event-button`)
    deleteButton.addEventListener('click', () => {
      this.adapter.destroyTeam(this.id).then(() => {
        const team = document.getElementById(`team${this.id}-item`)
        team.parentNode.removeChild(team)
      })
    })
  }
}
