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
    <ul class='team-events-list' id='team${this.id}-events-list'></ul>`;
  }

  createEvents (events) { // this is re-adding all the events???
    events.forEach((event) => {
      this.events.push(new Event(event)); // can we avoid passing this in by event knowing what its team id is?
    });
  }
}
