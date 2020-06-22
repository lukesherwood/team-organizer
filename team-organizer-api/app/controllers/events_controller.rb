class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events, except: [:created_at, :updated_at]
    end

    def show
        @event = Event.find(params[:id])
        if @event
            render json: @event, except: [:created_at, :updated_at]
        else
            render json: {message: 'Event not found'}
        end
    end
end







