class Api::PermissionsController < ApplicationController
  def create
    user_id = params[:user_id]
    metric_unit = MetricUnit.find_by_name!(params[:metric_unit_name])

    raise ActiveRecord::RecordNotFound unless User.exists?(user_id)

    permission = Permission.create! user_id: user_id,
                                    metric_unit_id: metric_unit.id

    render json: {
      data: {}
    }
  end
end
