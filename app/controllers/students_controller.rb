class StudentsController < ApplicationController

  def index
    students = Student.all
    render json: students
  end

  def show
    student = Student.find_by(id: params[:id])
    render json: student
  end

  def create
    classGroup = ClassGroup.find_by(uuid: student_params[:classUuid])
    if classGroup
      newUserInfo = student_params[:newUserInfo]
      newStudent = classGroup.students.create(newUserInfo)
  
      render json: newStudent
    else
      render json: {message: "Class not found"}
    end
  end

  # def update
  #   student = Student.find_by(id: params[:id])
  #   student.update()
  #   render json: student
  # end 

  # def destroy
  #   student = Student.find_by(id: params[:id])
  #   student.destroy
  #   render json: {message: "Student successfully deleted"}
  # end

  private

  def student_params
    params.permit(:classUuid, newUserInfo: [:username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, :years_studied, :first_language])
  end

end
