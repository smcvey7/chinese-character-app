class TestsController < ApplicationController

  def index
    tests = Test.all
    render json: tests
  end

  def show
    test = Test.find_by(id: params[:id])
    render json: test
  end

  def create
    test = Test.create(test_params)
    render json: test
  end

  def update
    # receive an array in params[:items]
    test = Test.find_by(id: params[:id])
    test.update(test_params)
    render json: test
  end

  def destroy
    test = Test.find_by(id: params[:id])
    test.destroy
    head :no_content
  end

  private

  def test_params
    params.permit(:score, :student_id, :version, :complete, :char_num, :items => [])
  end
end
