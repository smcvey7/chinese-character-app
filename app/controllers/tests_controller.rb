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
    params.permit(:id, :score, :student_id, :version, :complete, :char_num, {items: [:correct, :choice, :character_id]})
  end
end
