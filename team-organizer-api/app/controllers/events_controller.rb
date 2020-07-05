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
        if @event.save
            render json: @event, status: 200
        else
            render json: {message: 'Event not created'}
        end
    end

    private

    def event_params
        params.require(:event).permit(:name, :description, :location, :start_time, :end_time) #might need to add creator id and team id here?
    end
end







