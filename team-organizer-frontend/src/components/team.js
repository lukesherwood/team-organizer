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
    listItem.className = 'list-group-item';
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
    <div class='card' style="width: 50rem;"'>
    <h3 class="card-header text-white" style="background-color: rgb(38, 101, 122); opacity: 80%; padding: 2px;">Events</h3>
    <ul class='list-group list-group-flush' id='team${this.id}-events-list'></ul>
    </div>`
  }

  createEvents (events) {
    events.forEach((event) => {
      this.events.push(new Event(event));
    });
  }

  renderDeleteButton () {
    const buttonContainer = document.createElement('div')
    buttonContainer.id = `team${this.id}-delete-button-div`
    buttonContainer.innerHTML = `<button class='delete-team-button btn btn-outline-danger btn-sm' id="team-${this.id}delete-event-button">Delete this team</button><br>`
    const team = document.getElementById(`team${this.id}-title`)
    team.appendChild(buttonContainer)
  }

  eventListenerAndBindings () {
    const deleteButton = document.getElementById(`team-${this.id}delete-event-button`)
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove this player?')) {
        this.adapter.destroyTeam(this.id).then(() => {
          const team = document.getElementById(`team${this.id}-item`)
          team.parentNode.removeChild(team)
        })
      }
    })
  }
}
