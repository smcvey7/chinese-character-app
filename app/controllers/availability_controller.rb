class AvailabilityController < ApplicationController

  def show
    puts params, params[:username], params[:username] == ""
    availability = true
    availability = false if Student.find_by(username: params[:username]) || Teacher.find_by(username: params[:username])
    render json: availability
  end
end
