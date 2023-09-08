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
    class_group = ClassGroup.create(
      name: params[:name],
      teacher_id: params[:teacher_id]
    )
    render json: class_group
  end

  def update
    class_group = ClassGroup.find_by(id: params[:id])
    class_group.update(
      name: params[:name],
      teacher_id: params[:teacher_id]
    )
    render json: class_group
  end

  def destroy
    class_group = ClassGroup.find_by(id: params[:id])
    class_group.destroy
    render json: {message: "Class Group successfully deleted"}
  end

  
end
