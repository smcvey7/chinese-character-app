class ClassGroupsController < ApplicationController
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
    render json: class_group
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
    params.permit(:name, :teacher_id, :uuid, :level)
  end
  
end
