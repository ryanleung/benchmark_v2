module Api::MetricsHelper
  # TODO: make presenters for the metrics based on value, 
  # value_description, relevant_date/year, num_metrics and DRY this up
  # and docstring

  # Take a company, poop out their metrics dashboard.
  def metrics_dashboard(company_id)
    {
      annual_revenue: annual_revenue(company_id),
      accounts_per_sales_rep: accounts_per_sales_rep(company_id),
      direct_sales_reps_per_1k_fte: direct_sales_reps_fte_per_1k_fte(company_id),
      overall_sales_fte_role_breakdown: overall_sales_fte_role_breakdown(company_id),
      overall_sales_per_1k_fte: overall_sales_fte_per_1k_fte(company_id),
      revenue_per_employee: revenue_per_employee(company_id),
      sales_support_per_1k_fte: sales_support_per_1k_fte(company_id),
      total_num_employees: total_num_employees(company_id),
    }
  end
  module_function :metrics_dashboard

  private

  # Get average revenue per year
  def annual_revenue(company_id)
    revenue_metrics = Metric.where(
      metric_name: Metric::METRIC_ANNUAL_REVENUE,
      company_id: company_id)

    average_revenue_by_year = average_metrics_by_year(revenue_metrics)

    average_revenue_by_year.map do |year, revenue|
      {
        value: revenue,
        value_description: revenue_metrics.first.value_description, # pick any
        year: year
      }
    end
  end

  # Get the # of accounts per sales rep
  def accounts_per_sales_rep(company_id)
    # For each user, get accounts_per_sales_rep metric. If that
    # doesn't exist, get the total sales accounts and divide that
    # by the overall total sales FTE. If one of those two numbers
    # don't exist, then throw away.
    account_per_sales_metrics = Metric.where(
      metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
      company_id: company_id)

    account_per_sales_metrics_by_year = average_metrics_by_year(
      account_per_sales_metrics)

    account_per_sales_metrics_by_year.map do |year, num_accounts|
      {
        value: num_accounts,
        value_description: account_per_sales_metrics.first.value_description, # pick any
        year: year
      }
    end
  end

  # Average out metrics by year based on value and relevant_date.year
  def average_metrics_by_year(metrics)
    metrics_grouped_by_year = metrics.group_by { 
      |m| m.relevant_date.year 
    }

    Hash[metrics_grouped_by_year
      .map { |year, metrics| [year, metrics.map(&:value).reduce(:+) / metrics.size] }] 
  end
end