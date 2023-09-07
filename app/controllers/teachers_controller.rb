class TeachersController < ApplicationController
  def index
    teachers = Teacher.all
    render json: teachers
  end

  def show
    teacher = Teacher.find_by(id: params[:id])
    render json: teacher
  end

  def create
    if classGroup
      newUserInfo = student_params[:newUserInfo]
      newStudent = classGroup.students.create(newUserInfo)
  
      render json: newStudent
    else
      render json: {message: "Class not found"}
    end
  end

  # def update
  #   teacher = Teacher.find_by(id: params[:id])
  #   teacher.update()
  #   render json: teacher
  # end 

  # def destroy
  #   teacher = Teacher.find_by(id: params[:id])
  #   teacher.destroy
  #   render json: {message: "Teacher successfully deleted"}
  # end

  private

  def teacher_params
    params.permit(newUserInfo: [:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school])
  end
end
