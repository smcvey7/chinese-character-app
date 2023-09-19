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
    if !classGroup
      render json: {message: "Class not found"}
      return
    end

    student = classGroup.students.create(student_params[:newUserInfo])

    if student.valid?
      render json: student
    else
      render json: {message: "Student not created"}
    end
    
  end

  

  def update
    student = Student.find_by(id: params[:id])

    if student
      student.update(student_params)
      render json: student
    else
      render json: student.errors, status: :unprocessable_entity
    end
  end 

  # def destroy
  #   student = Student.find_by(id: params[:id])
  #   student.destroy
  #   render json: {message: "Student successfully deleted"}
  # end

  private

  def student_params
    params.permit(:age, :other_L2, :home_learning, :class_learning, :other_info, :username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, :first_language, :classUuid, {scores: []}, :id, newUserInfo: [:age, :other_L2, :home_learning, :class_learning, :other_info, :username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, :first_language])
  end

end
