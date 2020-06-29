/* eslint-disable semi */
class Teams {
  constructor () {
    this.teams = [];
    this.adapter = new TeamAdapter();
    this.eventListenerAndBindings()
    this.loadTeams();
  }

  loadTeams () {
    this.adapter
      .getTeams()
      .then((object) => {
        object.forEach((obj) => this.teams.push(new Team(obj)));
      })
      .then(() => {
        this.renderTeam();
      });
  }

  renderTeam () {
    const list = document.getElementById('team-list');
    this.teams.forEach((team) => { // should this be moved to team class?
      const listItem = document.createElement('li');
      listItem.className = 'team-list-item';
      listItem.id = `${team.teamNameToId()}-item`;
      listItem.innerHTML = team.renderHtml();
      list.appendChild(listItem);
      team.createEvents(team.events);
    });
  }

  eventListenerAndBindings () {
    this.eventLinks = document.getElementById('create-team-button')
    this.eventLinks.addEventListener('click', this.renderCreateTeamForm.bind(this))
  }

  renderCreateTeamForm () {
    const container = document.getElementById('create-team-form-container')
    const form = document.createElement('form')
    form.className = 'create-team-form'
    form.innerHTML = this.renderCreateHtml()
    container.appendChild(form)
  }

  renderCreateHtml () {
    return `
    <label for="teamName">Team Name:</label><br>
    <input type="text" id="teamName" name="teamName"><br>
    <input type="submit" value="Submit">`
  }
}
