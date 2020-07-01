class TeamsController < ApplicationController
    def index
        @teams = Team.all
        render json: @teams
    end

    def show
        @team = Team.find(params[:id])
        if @team
            render json: @team
        else
            render json: {message: 'Team not found'} #this doesnt actually fire
        end
    end

    def create
        @team = Team.new(team_params)
        if @team.save
            render json: @team, status: 200
        else
            render json: {message: 'Team not created'}
        end
    end

    private

    def team_params
        params.require(:team).permit(:name, :description)
    end
end
