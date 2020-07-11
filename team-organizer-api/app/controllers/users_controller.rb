class UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        Event.find(user_params[:event_id]).players << @user
        if @user.save
            render json: @user, status: 200
        else
            raise @user.errors.inspect #render json: {message: 'Event not created'}
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :event_id)
    end

end
