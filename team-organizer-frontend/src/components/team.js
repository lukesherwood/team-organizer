/* eslint-disable semi */
class Team {
  constructor (teamJSON) {
    this.id = teamJSON.id;
    this.name = teamJSON.name;
    this.description = teamJSON.description;
    this.events = teamJSON.events;
  }

  renderTeam (team) {
    const list = document.getElementById('team-list');
    const listItem = document.createElement('li');
    listItem.className = 'team-list-item';
    listItem.id = `${this.teamNameToId()}-item`;
    listItem.innerHTML = this.renderHtml();
    list.appendChild(listItem);
    this.createEvents(team.events);
  }

  renderHtml () {
    return `<h2>${this.name}</h2>
    <p>${this.description}</p>
    <h3>Events</h3>
    <ul class='team-events-list' id='${this.teamNameToId()}-events-list'></ul>`;
  }

  createEvents (events) { // this is re-adding all the events???
    events.forEach((element) => {
      this.events.push(new Event(element, this.teamNameToId()));
    });
  }

  teamNameToId () {
    return this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
}
