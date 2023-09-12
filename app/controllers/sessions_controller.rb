class SessionsController < ApplicationController

  def show
    if session[:user_id]
      if session[:role] == "student"
        user = Student.find_by(id: session[:user_id])
      elsif session[:role] == "teacher"
        user = Teacher.find_by(id: session[:user_id])
      end
      render json: user
    else
      render json: {errors: ["Not logged in"]}, status: :unauthorized
    end
  end
  

  def create
    if params[:role] == "student"
      user = Student.find_by(username: params[:userInfo][:username])
      puts user
    elsif params[:role] == "teacher"
      user = Teacher.find_by(username: params[:userInfo][:username])
      
    end

    if user&.authenticate(params[:userInfo][:password])
      session[:user_id] = user.id
      session[:admin] = user.admin unless params[:role] == "student"
      session[:role] = params[:role]
      render json: user
    else
      render json: {message: "Invalid username or password"}, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      session.delete :admin
      head :no_content
    else
      render json: {errors: ["Not logged in"]}, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:role, userInfo: [:username, :password])
  end

end