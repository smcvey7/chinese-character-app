class TestsController < ApplicationController
  
    before_action :authorize, only: [:create, :update]

    # def delete_blank_tests
    #   Test.all.each do |test|
    #     if test.items.length == 0
    #       test.destroy
    #     end
    #   end
    # end


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

  def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless params[:student_id] == session[:user_id]
  end

end
