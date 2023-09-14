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

    param_items = {
      correct: test_params[:items][0][:correct],
      choice: test_params[:items][0][:choice],
      character_id: test_params[:items][0][:character_id]
    }
        
    test = Test.find_by(id: params[:id])
    test.update(test_params)
    test.update(items: param_items)
    render json: test
  end

  def destroy
    test = Test.find_by(id: params[:id])
    test.destroy
    head :no_content
  end

  private

  def test_params
    params.permit(:id, :score, :student_id, :version, :complete, :char_num, :items => [:correct, :choice, :character_id])
  end
end
