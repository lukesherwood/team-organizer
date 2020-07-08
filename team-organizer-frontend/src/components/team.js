/* eslint-disable semi */
class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id;
    this.name = teamJSON.name;
    this.description = teamJSON.description;
    this.rawEvents = teamJSON.events;
    this.events = []
  };

  renderTeam () {
    const list = document.getElementById('team-list');
    const listItem = document.createElement('li');
    listItem.className = 'team-list-item';
    listItem.id = `team${this.id}-item`;
    listItem.innerHTML = this.renderHtml();
    list.appendChild(listItem);
    this.createEvents(this.rawEvents);
  }

  renderHtml () {
    return `<h2>${this.name}</h2>
    <p>${this.description}</p>
    <h3>Events</h3>
    <ul class='team-events-list' id='team${this.id}-events-list'></ul><br>
    <div id="team-${this.id}-create-event-form-container">
      <button class='create-event-button' id='team-${this.id}-create-event-button'>Create a New Event</button>
      <form id='team-${this.id}-create-event-form'></form>
    </div>`;
  }

  createEvents (events) {
    events.forEach((event) => {
      this.events.push(new Event(event));
    });
  }
}
