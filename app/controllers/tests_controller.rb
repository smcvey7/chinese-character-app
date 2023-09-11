class TestsController < ApplicationController

  def index
    tests = Test.all
    render json: tests
  end

  def create
    test = Test.create(test_params)
    render json: test
  end

  def update
    test = Test.find_by(id: params[:id])
    test.update(test_params)
    render json: test
  end

  def destroy
    test = Test.find_by(id: params[:id])
    test.destroy
    render json: test
  end

  private

  def test_params
    params.permit(:score, :student_id, :score, :version, :items, :complete)
  end
end
