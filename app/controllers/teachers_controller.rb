class TeachersController < ApplicationController
  def index
    teachers = Teacher.all
    render json: teachers
  end

  def show
    teacher = Teacher.find_by(id: params[:id])
    render json: teacher,
    serializer: TeacherSerializer, 
    include: ['class_groups', 'class_groups.students', 'class_groups.tests']
  end

  def create
    teacher = Teacher.create(teacher_params[:newUserInfo])

    if teacher.valid?
      render json: teacher
    else
      render json: {message: "Teacher not created"}
    end
  end

  def update
    teacher = Teacher.find_by(id: params[:id])
    teacher.update(teacher_params)
    render json: teacher
  end 

  # def destroy
  #   teacher = Teacher.find_by(id: params[:id])
  #   teacher.destroy
  #   render json: {message: "Teacher successfully deleted"}
  # end

  private

  def teacher_params
    params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, newUserInfo: [:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school])
  end
end
