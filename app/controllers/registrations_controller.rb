class RegistrationsController < ApplicationController

  before_action :authorize_user, only: [:create, :update, :destroy]
  before_action :authorize_admin, only: [:index, :show]

  def index
    registrations = Registration.all
    render json: registrations
  end

  def show
    registration = Registration.find_by(id: params[:id])
    render json: registration
  end

  def create
    classGroup = ClassGroup.find_by(uuid: registration_params[:class_group_uuid])
    if !classGroup
      render json: {errors: ["Class not found."]}, status: :not_found
      return
    end

    registration = classGroup.registrations.create(class_group_id: classGroup.id, student_id: registration_params[:student_id])

    if registration.valid?
      render json: registration, status: :created
    else
      render json: {errors: registration.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
    def registration_params
      params.permit(:student_id, :class_group_uuid)
    end

    def authorize_user
      return render json: {errors: ["Not authorized"]}, status: :unauthorized unless params[:student_id] == session[:user_id]
    end

    def authorize_admin
      return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session[:role] == "admin"
    end

end
