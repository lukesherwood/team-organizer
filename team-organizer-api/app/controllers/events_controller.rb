class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events
    end

    def show
        @event = Event.find(params[:id])
        if @event
            render json: @event
        else
            render json: {message: 'Event not found'} #this doesnt actually fire
        end
    end

    def create
        @event = Event.new(event_params)
        @event.team = Team.find(event_params[:team_id])
        @event.creator = User.last ## this will need to change when users implemented or not
        if @event.save
            render json: @event, status: 200
        else
            render json: {message: 'Error creating event'} #render json: {message: 'Event not created'}
        end
    end

    def destroy
        @event = Event.find(event_params[:id])
        if @event.destroy
            render body: {}, status: :no_content
        else
            render json: {message: 'Error deleting event'} #render json: {message: 'Event not created'}
        end
    end

    private

    def event_params
        params.require(:event).permit(:name, :description, :location, :start_time, :end_time, :team_id, :id)
    end
end







