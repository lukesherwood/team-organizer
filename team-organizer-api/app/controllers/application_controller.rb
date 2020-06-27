class ApplicationController < ActionController::API
    def index
        render '/team-organizer/team-organizer-frontend/index.html'
    end
end
