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
      if (this.createTeamForm) { // collapses form if already open
        this.createTeamForm.innerHTML = ''
        this.createTeamButton.innerText = 'Create a new team'
        this.createTeamForm = false
      } else {
        this.renderCreateTeamForm()
        this.createTeamButton.innerText = 'Click here to close'
      }
    })
  }

  renderCreateTeamForm () {
    const teamFormContainer = document.getElementById('form-container') || document.createElement('div')
    teamFormContainer.id = 'form-container'
    const topDiv = document.getElementById('team-list')
    topDiv.prepend(teamFormContainer)
    this.createTeamForm = document.createElement('div')
    teamFormContainer.appendChild(this.createTeamForm)
    this.createTeamForm.innerHTML = this.renderCreateHtml()
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
    document.getElementById('create-team-button').click() // collapses form
  }

  renderCreateHtml () {
    return `
    <div class="card" style="width:49%; float:left;">
    <h4 class="card-header text-white" style="background-color: #266563; opacity: 75%; padding: 2px;">Create a New Team</h4>
    <div class="card-body">
    <form id='create-team-form'>
    <div class="form-group">
    <label for="teamName">Team Name:</label>
    <input type="text" class="form-control" id="teamName" name="teamName" required>
    </div>
    <div class="form-group">
    <label for="teamDesc">Team Description:</label>
    <textarea id="teamDesc" class="form-control" name="teamDesc" rows="3"></textarea>
    </div>
    <input type="submit" id='create-team-submit' class="btn btn-outline-primary mb-2" value="Submit">
    </form>
    </div>
    </div>
    `
  }
}
