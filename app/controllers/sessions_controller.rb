class SessionsController < ApplicationController

  def show
    if session[:user_id]
      if session[:role] == "student"
        user = Student.find_by(id: session[:user_id])
        render json: user
      elsif session[:role] == "teacher"
        user = Teacher.find_by(id: session[:user_id])
        render json: user,
        serializer: TeacherSerializer,
        include: ['class_groups', 'class_groups.students', 'students.tests']
      end

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
      if params[:role] == "teacher"
        render json: user,
        serializer: TeacherSerializer,
        include: ['class_groups', 'class_groups.students', 'students.tests']
      else
        render json: user
      end

    else
      render json: {errors: ["Invalid username or password", "Confirm student/teacher selection"]}, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      session.delete :admin
      head :no_content
    else
      render json: {errors: ["No user logged in"]}, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:role, userInfo: [:username, :password])
  end

end
