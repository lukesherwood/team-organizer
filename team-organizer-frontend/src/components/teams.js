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
    this.createTeamButton = document.getElementById('create-team-button')
    this.createTeamButton.addEventListener('click', this.renderCreateTeamForm.bind(this))
  }

  renderCreateTeamForm () {
    const container = document.getElementById('create-team-form-container')
    const form = document.createElement('form')
    form.id = 'create-team-form'
    form.innerHTML = this.renderCreateHtml()
    container.appendChild(form)
    this.createTeamSubmit = document.getElementById('create-team-form')
    this.createTeamSubmit.addEventListener('submit', (event) => {
      event.preventDefault()
      this.processCreateTeamForm(event)
    })
  }

  processCreateTeamForm (e) {
    const teamName = document.getElementById('teamName').value
    console.log(`You just entered '${teamName}' as your team name`)
  }

  renderCreateHtml () {
    return `
    <label for="teamName">Team Name:</label><br>
    <input type="text" id="teamName" name="teamName"><br>
    <input type="submit" id='create-team-submit' value="Submit">` // will need to add the rest of properties as an input
  }
}
