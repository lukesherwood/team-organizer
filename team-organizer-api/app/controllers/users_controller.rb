class UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        Event.find(user_params[:event_id]).players << @user
        if @user.save
            render json: @user, status: 200
        else
            raise @user.errors.inspect
        end
    end

    def destroy
        @event = Event.find(user_params[:event_id])
        if @event.players.delete(user_params[:id])
            render body: {}, status: :no_content
        else
            render json: {message: 'Error deleting player'}
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :event_id, :id)
    end

end
