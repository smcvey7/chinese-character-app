class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      # session[:user_id] = user.id
      render json: user
    else
      render json: {message: "Invalid username or password"}
    end
  end

  def destroy
    # session.delete :user_id
    render json: {message: "Successfully logged out"}
  end

end
