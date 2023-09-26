class ClassGroupsController < ApplicationController

  # before_action :authorize, only: [:create, :update, :destroy]

  def index
    class_groups = ClassGroup.all
    render json: class_groups
  end

  def show
    class_group = ClassGroup.find_by(id: params[:id])
    render json: class_group
  end

  def create
    class_group = ClassGroup.create(class_group_params)
    if class_group.valid?
      render json: class_group, serializer: NewClassGroupSerializer, status: :created
    else
      render json: {errors: class_group.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    class_group = ClassGroup.find_by(id: params[:id])
    class_group.update(class_group_params)
    render json: class_group
  end

  def destroy
    class_group = ClassGroup.find_by(id: params[:id])
    class_group.destroy
    head :no_content
  end

  private

  def class_group_params
    params.permit(:name, :teacher_id, :uuid)
  end

  def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless params[:teacher_id] == session[:user_id]
  end
  
end
