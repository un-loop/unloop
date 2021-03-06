class Api::PaperworksController < ApplicationController
  before_action :set_paperwork, only: [:update, :complete, :viewed, :destroy]
  respond_to :json

  def create
    @paperwork = authorize Paperwork.new(paperwork_params)
    sentry_helper(@paperwork)
    if @paperwork.save
      render json: @paperwork, status: :created
    else
      Raven.capture_message("Could not create paperwork")
      render json: { error: 'Could not create paperwork' }, status: :unprocessable_entity
    end
  end

  def update
    if @paperwork.update(paperwork_params)
      render json: @paperwork, status: :ok
    else
      Raven.capture_message("Could not update paperwork")
      render json: { error: 'Could not update paperwork' }, status: :unprocessable_entity
    end
  end

  def complete
    if @paperwork.update(agree: true)
      render json: @paperwork, status: :ok
    else
      Raven.capture_message("Failed to mark as agreed")
      render json: { error: 'Failed to mark as agreed' }, status: :unprocessable_entity
    end
  end

  def viewed
    if @paperwork.update(viewed: true)
      render json: @paperwork, status: :ok
    else
      Raven.capture_message("Failed to mark as agreed")
      render json: { error: 'Failed to mark as agreed' }, status: :unprocessable_entity  
    end
  end

  def destroy
    if @paperwork.destroy
      render json: @paperwork, status: :ok
    else
      Raven.capture_message("Failed to delete paperwork")
      render json: { error: 'Failed to delete paperwork' }, status: :unprocessable_entity
    end
  end

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
  end

  private

  def set_paperwork
    @paperwork = authorize Paperwork.find(params[:id])
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(paperwork_id: params[:id])
    Raven.capture_exception(exception)
    render json: { error: 'Could not find paperwork' }, status: :not_found
  end

  def sentry_helper(paperwork)
    Raven.extra_context(paperwork: paperwork.attributes)
    Raven.extra_context(staff: paperwork.staff.user.attributes)
    Raven.extra_context(participant: paperwork.participant.user.attributes)
  end

  def paperwork_params
    paperwork_param = params.require(:paperwork).permit(:title,
                                                        :link,
                                                        :agree,
                                                        :participant_id)
    paperwork_param.merge(staff_id: current_user.staff.id)
  end
end
