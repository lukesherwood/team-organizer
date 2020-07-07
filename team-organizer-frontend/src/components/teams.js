/* eslint-disable semi */
class Teams {
  constructor () {
    this.teams = [];
    this.adapter = new TeamAdapter();
    this.eventListenerAndBindings()
    this.loadTeams();
  }

  loadTeams () { // fetches teams from database and adds each to teams array, then calls renderTeam
    this.adapter
      .getTeams()
      .then((object) => {
        object.forEach((obj) => this.teams.push(new Team(obj)));
      })
      .then(() => {
        this.renderTeams();
      });
  }

  renderTeams () {
    this.teams.forEach((team) => {
      team.renderTeam()
    });
  }

  eventListenerAndBindings () { // listening for click on create team button
    this.createTeamButton = document.getElementById('create-team-button')
    this.createTeamButton.addEventListener('click', () => {
      if (this.createTeamForm) {
        this.createTeamForm.innerHTML = ''
        this.createTeamForm = false
      } else {
        this.renderCreateTeamForm()
      }
    })
  }

  renderCreateTeamForm () {
    const container = document.getElementById('create-team-form-container')
    this.createTeamForm = document.getElementById('create-team-form') || document.createElement('form')
    this.createTeamForm.id = 'create-team-form'
    this.createTeamForm.innerHTML = this.renderCreateHtml()
    container.appendChild(this.createTeamForm)
    this.createTeamForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.processCreateTeamForm()
    })
  }

  processCreateTeamForm () {
    const teamName = document.getElementById('teamName')
    const teamDesc = document.getElementById('teamDesc')
    this.adapter.createTeam(teamName.value, teamDesc.value).then(team => {
      const newTeam = new Team(team)
      this.teams.push(newTeam)
      teamName.value = ''
      teamDesc.value = ''
      newTeam.renderTeam()
    })
  }

  renderCreateHtml () {
    return `
    <label for="teamName">Team Name:</label><br>
    <input type="text" id="teamName" name="teamName"><br>
    <label for="teamDesc">Team Description:</label><br>
    <input type="text" id="teamDesc" name="teamDesc"><br>
    <input type="submit" id='create-team-submit' value="Submit">`
  }
}
