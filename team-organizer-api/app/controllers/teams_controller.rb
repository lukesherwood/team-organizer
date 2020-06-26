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
end
