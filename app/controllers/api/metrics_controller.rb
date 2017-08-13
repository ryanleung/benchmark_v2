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
      data: Api::MetricsHelper.metrics_dashboard(params[:company_id], current_user)
    }
  end

  def create
    raise ActiveRecord::RecordNotFound unless Company.exists?(params[:company_id])

    metrics = params[:metrics]
    # If there is more than one metric, save a metric_batch random UUID to "batch"
    # the metrics together, signifying that they were submitted together
    metric_batch = metrics.length > 1 ? SecureRandom.uuid : nil
    metrics.each do |metric|
      value_description = Metric::METRIC_TO_VALUE_DESC[metric[:metric_name]]
      relevant_date = DateTime.new(metric[:relevant_date])

      new_metric = Metric.create! metric_name: metric[:metric_name],
                            company_id: params[:company_id],
                            value: metric[:value],
                            value_description: value_description,
                            relevant_date: relevant_date,
                            metric_batch: metric_batch,
                            user_id: current_user.id
    end

    render json: {
      data: {}
    }
  end

  # TODO: verify with Vince that this is correct user behavior
  # TODO: move this out of metrics controller into somewhere more
  # encapsulated
  def form_metrics
    render json: {
      data: {
        fields: [
          {
            title: "Annual Revenue",
            input_fields: [
              {
                title: "Annual Revenue",
                metric_name: Metric::METRIC_ANNUAL_REVENUE,
              }
            ]
          },
          {
            title: "Total Number of Employees",
            input_fields: [
              {
                title: "Total # of Employees",
                metric_name: Metric::METRIC_NUM_EMPLOYEES,
              }
            ],
          },
          {
            title: "Accounts Per Sales Rep",
            input_fields: [
              {
                title: "Accounts Per Sales Rep",
                metric_name: Metric::METRIC_NUM_EMPLOYEES,
              }
            ]
          },
          {
            title: "Direct Sales FTE",
            input_fields: [
              {
                title: "Total Direct Sales FTE",
                metric_name: Metric::METRIC_DIRECT_SALES_FTE
              },
            ]
          },
          {
            title: "Overall Sales FTE",
            input_fields: [
              {
                title: "Total Sales FTE",
                metric_name: Metric::METRIC_OVERALL_SALES_FTE
              },
            ]
          },
          {
            title: "Sales Support FTE",
            input_fields: [
              {
                title: "Total Sales Support FTE",
                metric_name: Metric::METRIC_SALES_SUPPORT_FTE
              },
            ]
          },
          {
            title: "Quota Per Sales Rep",
            input_fields: [
              {
                title: "Quota Per Sales Rep",
                metric_name: Metric::METRIC_QUOTA_PER_SALES_REP
              },
            ]
          },
          {
            title: "Sales Cycle Length",
            input_fields: [
              {
                title: "Sales Cycle Length",
                metric_name: Metric::METRIC_SALES_CYCLE_LENGTH
              },
            ]
          },
          {
            title: "Lead To Close Conversion Rate",
            input_fields: [
              {
                title: "Lead To Close Conversion Rate",
                metric_name: Metric::METRIC_LEAD_TO_CLOSE_CONVERSION_RATE
              },
            ]
          },
          {
            title: "Annual Spend Per Customer",
            input_fields: [
              {
                title: "Annual Spend Per Customer",
                metric_name: Metric::METRIC_ANNUAL_SPEND_PER_CUSTOMER
              },
            ]
          },
        ]
      }
    }
  end
end
