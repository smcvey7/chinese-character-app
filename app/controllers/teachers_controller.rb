class TeachersController < ApplicationController

  before_action :authorize, only: [:update, :destroy]

  def index
    teachers = Teacher.all
    render json: teachers
  end

  def show
    teacher = Teacher.find_by(id: params[:id])
    render json: teacher
  end

  def create
    teacher = Teacher.create(teacher_params[:newUserInfo])

    if teacher.valid?
      session[:user_id] = teacher.id
      session[:role] = "teacher"
      session[:admin] = teacher.admin

      render json: teacher, status: :created
    else
      render json: {errors: teacher.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    teacher = Teacher.find_by(id: params[:id])
    teacher.update(teacher_params)
    if teacher.valid?
      render json: teacher
    else
      render json: {errors: teacher.errors.full_messages}, status: :unprocessable_entity
    end
  end 

  # def destroy
  #   teacher = Teacher.find_by(id: params[:id])
  #   teacher.destroy
  #   head :no_content
  # end

  private

  def teacher_params
    params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, newUserInfo: [:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school])
  end

  def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless params[:teacher_id] == session[:user_id]
  end

end
