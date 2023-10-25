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
      render json: {errors: ["Class not found. If you do not have a class id, please select 'not part of a class'"]}, status: :not_found
      return
    end

    student = Student.create(student_params[:newUserInfo])
    registration = Registration.create(class_group_id: classGroup.id, student_id: student.id)


    if student.valid?
      session[:user_id] = student.id
      session[:role] = "student"

      render json: student, status: :created
    else
      render json: {errors: student.errors.full_messages}, status: :unprocessable_entity
    end
    
  end

  def update
    student = Student.find_by(id: params[:id])
    student.update(student_params)
    if student.valid?
      render json: student
    else
      render json: {errors: student.errors.full_messages}, status: :unprocessable_entity
    end
  end 

  def destroy
    student = Student.find_by(id: params[:id])
    student.destroy
    head :no_content
  end

  private

  def student_params
    params.permit(:age, :other_L2, :home_learning, :class_learning, :other_info, :username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, :first_language, :classUuid, {scores: []}, :id, newUserInfo: [:age, :other_L2, :home_learning, :class_learning, :other_info, :username, :email, :first_name, :last_name, :password, :password_confirmation, :country, :school, :first_language])
  end

end
