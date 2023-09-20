class CharactersController < ApplicationController

  before_action :authorize, only: [:update]

  def index
    characters = Character.all
    render json: characters
  end

  def update
    character = Character.find_by(id: params[:id])
    character.update(
      traditional: params[:traditional],
      hsk_level: params[:hsk_level],
      strokes: params[:strokes],
      components: params[:components],
      choices: params[:choices],
      pinyin: params[:pinyin],
      checked: params[:checked]
    )
    render json: character

  end

  private

  def character_params
    params.permit(:traditional, :hsk_level, :strokes, :components, :choices, :pinyin, :checked, :appeared, :correct)
  end

  def authorize
    return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session[:admin]
  end

end
