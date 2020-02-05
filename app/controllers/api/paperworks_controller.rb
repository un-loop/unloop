class Api::PaperworksController < ApplicationController
  before_action :set_paperwork, only: [:show, :update, :complete, :viewed, :destroy]
  respond_to :json

  def show
    render json: @paperwork
  end

  def create
    @paperwork = authorize Paperwork.new(paperwork_params)
    if @paperwork.save
      render json: @paperwork, status: :created
    else
      render json: { error: 'Could not create paperwork' }, status: :unprocessable_entity
    end
  end

  def update
    if @paperwork.update(paperwork_params)
      render json: @paperwork, status: :ok
    else
      render json: { error: 'Could not update paperwork' }, status: :unprocessable_entity
    end
  end

  def complete
    if @paperwork.update(agree: true)
      render json: @paperwork, status: :ok
    else
      render json: { error: 'Failed to mark as agreed' }, status: :unprocessable_entity
    end
  end

  def viewed
    if @paperwork.update(viewed: true)
      render json: @paperwork, status: :ok
    else
      render json: { error: 'Failed to mark as agreed' }, status: :unprocessable_entity  
    end
  end

  def destroy
    if @paperwork.destroy
      render json: @paperwork, status: :ok
    else
      render json: { error: 'Failed to delete paperwork' }, status: :unprocessable_entity
    end
  end

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
  end

  private

  def set_paperwork
    @paperwork = authorize Paperwork.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Could not find paperwork' }, status: :not_found
  end

  def paperwork_params
    paperwork_param = params.require(:paperwork).permit(:title,
                                                        :link,
                                                        :agree,
                                                        :participant_id)
    paperwork_param.merge(staff_id: current_user.staff.id)
  end
end
