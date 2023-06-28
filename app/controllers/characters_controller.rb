class CharactersController < ApplicationController

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


end
