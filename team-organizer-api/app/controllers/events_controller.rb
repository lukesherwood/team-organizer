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
end







