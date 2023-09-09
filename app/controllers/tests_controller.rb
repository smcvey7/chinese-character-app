class TestsController < ApplicationController

  def index
    tests = Test.all
    render json: tests
  end

  def create
    test = Test.create(
      name: params[:name],
      user_id: params[:user_id],
      character_ids: params[:character_ids]
    )
    render json: test
  end

  def update
    test = Test.find_by(id: params[:id])
    test.update(
      name: params[:name],
      user_id: params[:user_id],
      character_ids: params[:character_ids]
    )
    render json: test
  end

  def destroy
    test = Test.find_by(id: params[:id])
    test.destroy
    render json: test
  end
end
