class Api::MetricsController < ApplicationController

  # Fetch all metrics for a given company
  def index
    metrics = Metric.where(company_id: params[:company_id])
    if metrics.blank?
      render(
        json: {
          error: {
            code: 404,
            message: "No metrics found for company",
            errors: {
              message: "No metrics found for company"
            }
          }
        })
      return
    end

    render json: {
      data: {
        kind: Metric.name,
        items: metrics.map { |m| m.as_json(include: [:metric_name, :metric_type, :function, :business_unit]) }
      }
    }
  end

  # Get metrics dashboard for a given company
  def metrics_dashboard
    raise ActiveRecord::RecordNotFound unless Company.exists?(params[:company_id])

    render json: {
      data: Api::MetricsHelper.metrics_dashboard(params[:company_id])
    }
  end

  def create
    raise ActiveRecord::RecordNotFound unless Company.exists?(params[:company_id])

    new_metric = Metric.create! metric_name: params[:metric_name],
                                metric_type_id: params[:metric_type_id],
                                company_id: params[:company_id],
                                value: params[:value],
                                value_description: params[:value_description],
                                relevant_date: params[:relevant_date],
                                user_id: params[:user_id]

    render json: {
      data: {
        kind: Metric.name,
        item: new_metric.as_json(include: [:metric_name, :metric_type, :function, :business_unit])
      }
    }
  end
end