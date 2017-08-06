class Api::PermissionsController < ApplicationController
  def create
    user_id = params[:user_id]
    metric_id = params[:metric_id]

    raise ActiveRecord::RecordNotFound unless User.exists?(user_id) and Metric.exists?(metric_id)

    permission = Permission.create! user_id: user_id,
                                    metric_id: metric_id

    render json: {
      data: {}
    }
  end
end
