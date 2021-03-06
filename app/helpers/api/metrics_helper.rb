module Api::MetricsHelper
  # TODO: make presenters for the metrics based on value,
  # value_description, relevant_date/year, num_metrics and DRY this up
  # and docstring

  # Take a company, poop out their metrics dashboard.
  def metrics_dashboard(company_id, current_user)
    if current_user.nil?
      return limited_view(company_id)
    else
      return user_view(company_id, current_user)
    end
  end
  module_function :metrics_dashboard

  def limited_view(company_id)
    {
      metrics_dashboard: [
        overview_metrics(company_id),
        sales_organization_structure(company_id, nil),
        sales_process_metrics(company_id, nil),
        financial_performance_metrics(company_id, nil)
      ]
    }
  end
  module_function :limited_view

  def user_view(company_id, current_user)
    {
      metrics_dashboard: [
        overview_metrics(company_id),
        sales_organization_structure(company_id, current_user),
        sales_process_metrics(company_id, current_user),
        financial_performance_metrics(company_id, current_user)
      ]
    }
  end
  module_function :user_view

  def overview_metrics(company_id)
    {
      group: "Overview",
      metrics: [
      {
        mu_key: MetricUnit::MU_REVENUE,
        title: "Revenue",
        values: annual_revenue(company_id),
        locked: false,
      },
      {
        mu_key: MetricUnit::MU_EMPLOYEES,
        title: "Employees",
        values: total_num_employees(company_id),
        locked: false,
      },
      {
        mu_key: MetricUnit::MU_REVENUE_PER_EMPLOYEE,
        title: "Revenue per employee",
        values: revenue_per_employee(company_id),
        locked: false,
      }]
    }
  end
  module_function :overview_metrics

  def sales_organization_structure(company_id, current_user)
    overall_sales_perm = current_user and current_user.has_permission?(MetricUnit::MU_OVERALL_SALES_PER_FTE)
    direct_sales_perm = current_user and current_user.has_permission?(MetricUnit::MU_DIRECT_SALES_PER_FTE)
    accounts_per_sales_perm = current_user and current_user.has_permission?(MetricUnit::MU_ACCOUNTS_PER_SALES_REP)
    sales_support_perm = current_user and current_user.has_permission?(MetricUnit::MU_SALES_SUPPORT_PER_FTE)

    {
      group: "Sales Organization Structure",
      metrics: [
      {
        mu_key: MetricUnit::MU_OVERALL_SALES_PER_FTE,
        title: "Total sales FTEs per 1000 FTEs",
        values: overall_sales_reps_per_1k_fte(company_id),
        locked: !overall_sales_perm
      },
      {
        mu_key: MetricUnit::MU_DIRECT_SALES_PER_FTE,
        title: "Direct sales FTEs per 1000 FTEs",
        values: direct_sales_reps_per_1k_fte(company_id),
        locked: !direct_sales_perm
      },
      {
        mu_key: MetricUnit::MU_ACCOUNTS_PER_SALES_REP,
        title: "Average customers per direct sales FTE",
        values: accounts_per_sales_rep(company_id),
        locked: !accounts_per_sales_perm
      }]
    }
  end
  module_function :sales_organization_structure

  def sales_process_metrics(company_id, current_user)
    quota_perm = current_user and current_user.has_permission?(MetricUnit::MU_QUOTA_PER_SALES_REP)
    sales_cycle_perm = current_user and current_user.has_permission?(MetricUnit::MU_SALES_CYCLE_LENGTH)
    lead_close_perm = current_user and current_user.has_permission?(MetricUnit::MU_LEAD_TO_CLOSE_CONVERSION_RATE)
    annual_spend_perm = current_user and current_user.has_permission?(MetricUnit::MU_ANNUAL_SPEND_PER_CUSTOMER)
    annual_customer_churn_perm = current_user and current_user.has_permission?(MetricUnit::MU_ANNUAL_CUSTOMER_CHURN_PERCENT)

    {
      group: "Sales Process",
      metrics: [
        {
          mu_key: MetricUnit::MU_QUOTA_PER_SALES_REP,
          title: "Quota per sales rep",
          values: quota_per_sales_rep(company_id),
          locked: !quota_perm,
        },
        {
          mu_key: MetricUnit::MU_SALES_CYCLE_LENGTH,
          title: "Sales cycle length",
          values: sales_cycle_length(company_id),
          locked: !sales_cycle_perm,
        },
        {
          mu_key: MetricUnit::MU_LEAD_TO_CLOSE_CONVERSION_RATE,
          title: "Lead to close conversion rate",
          values: lead_to_close_conversion_rate(company_id),
          locked: !lead_close_perm,
        },
        {
          mu_key: MetricUnit::MU_ANNUAL_CUSTOMER_CHURN_PERCENT,
          title: "Annual customer churn",
          values: annual_customer_churn_percent(company_id),
          locked: !annual_customer_churn_perm,
        }
      ]
    }
  end
  module_function :sales_process_metrics

  def financial_performance_metrics(company_id, current_user)
    sales_force_perm = current_user and current_user.has_permission?(MetricUnit::MU_SALES_FORCE_EXPENDITURE)
    net_new_rev_perm = current_user and current_user.has_permission?(MetricUnit::MU_NET_NEW_REVENUE_PER_SALES_REP)
    customer_lifetime_perm = current_user and current_user.has_permission?(MetricUnit::MU_CUSTOMER_LIFETIME_VALUE)

    {
      group: "Financial Performance",
      metrics: [
        {
          mu_key: MetricUnit::MU_SALES_FORCE_EXPENDITURE,
          title: "Sales force expenditure per $100M revenue",
          values: sales_force_expenditure_per_100m(company_id),
          locked: !sales_force_perm
        },
        {
          mu_key: MetricUnit::MU_NET_NEW_REVENUE_PER_SALES_REP,
          title: "Net new revenue per sales rep",
          values: net_new_rev_per_sales_rep(company_id),
          locked: !net_new_rev_perm
        },
        {
          mu_key: MetricUnit::MU_CUSTOMER_LIFETIME_VALUE,
          title: "Customer lifetime value",
          values: customer_lifetime_value(company_id),
          locked: !customer_lifetime_perm
        }
      ]
    }
  end
  module_function :financial_performance_metrics

  class << self
    # Get the # of accounts per sales rep
    def accounts_per_sales_rep(company_id)
      account_per_sales_metrics = Metric.where(
        metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
        company_id: company_id)

      account_per_sales_metrics_by_year = average_metrics_by_year(
        account_per_sales_metrics)

      account_per_sales_metrics_by_year.map do |year, num_accounts|
        {
          value: round_value(num_accounts),
          value_description: Metric::VALUE_DESC_QUANTITY,
          year: year
        }
      end
    end

    # Get average revenue per year
    def annual_revenue(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_ANNUAL_REVENUE,
        company_id)
    end

    # Get direct sales per 1k fte per year
    def direct_sales_reps_per_1k_fte(company_id)
      # Direct sales fte / total # employees
      metrics_per_1k(
        Metric::METRIC_DIRECT_SALES_FTE,
        Metric::METRIC_NUM_EMPLOYEES,
        company_id)
    end

    # Get the # of direct sales per 1k fte from internally inputted data
    def internal_direct_sales_reps_per_1k_fte(company_id)
      # Direct sales fte / total # internal employees
      metrics_per_1k(
        Metric::METRIC_DIRECT_SALES_FTE,
        Metric::METRIC_NUM_WEB_EMPLOYEES,
        company_id)
    end

    # Get overall sales per 1k fte per year
    def overall_sales_reps_per_1k_fte(company_id)
      # Overall sales fte / total # employees
      metrics_per_1k(
        Metric::METRIC_OVERALL_SALES_FTE,
        Metric::METRIC_NUM_EMPLOYEES,
        company_id)
    end

    # Get overall sales per 1k internal fte per year
    def internal_overall_sales_reps_per_1k_fte(company_id)
      metrics_per_1k(
        Metric::METRIC_OVERALL_SALES_FTE,
        Metric::METRIC_NUM_WEB_EMPLOYEES,
        company_id)
    end

    def revenue_per_employee(company_id)
      # TODO: this is kinda ugly, we just get per 1k and then divide 1k
      # to get per employee
      metrics_per_1k(
        Metric::METRIC_ANNUAL_REVENUE,
        Metric::METRIC_NUM_EMPLOYEES,
        company_id)
      .map do |metric|
        {
          value: round_value(metric[:value] / 1000),
          value_description: Metric::VALUE_DESC_USD,
          year: metric[:year]
        }
      end
    end

    def internal_revenue_per_employee(company_id)
      # TODO: this is kinda ugly, we just get per 1k and then divide 1k
      # to get per employee
      metrics_per_1k(
        Metric::METRIC_ANNUAL_REVENUE,
        Metric::METRIC_NUM_WEB_EMPLOYEES,
        company_id)
      .map do |metric|
        {
          value: round_value(metric[:value] / 1000),
          value_description: metric[:value_description],
          year: metric[:year]
        }
      end
    end

    def sales_support_per_1k_fte(company_id)
      metrics_per_1k(
        Metric::METRIC_SALES_SUPPORT_FTE,
        Metric::METRIC_NUM_EMPLOYEES,
        company_id)
    end

    def internal_sales_support_per_1k_fte(company_id)
      metrics_per_1k(
        Metric::METRIC_SALES_SUPPORT_FTE,
        Metric::METRIC_NUM_WEB_EMPLOYEES,
        company_id)
    end

    # Total num employees per year on avg
    def total_num_employees(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_NUM_EMPLOYEES,
        company_id)
    end

    # Total num internal employees per year on avg
    def internal_total_num_employees(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_NUM_WEB_EMPLOYEES,
        company_id)
    end

    def quota_per_sales_rep(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_QUOTA_PER_SALES_REP,
        company_id)
    end

    def sales_cycle_length(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_SALES_CYCLE_LENGTH,
        company_id)
    end

    def lead_to_close_conversion_rate(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_LEAD_TO_CLOSE_CONVERSION_RATE,
        company_id)
    end

    def annual_spend_per_customer(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_ANNUAL_SPEND_PER_CUSTOMER,
        company_id)
    end

    def annual_customer_churn_percent(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_AVERAGE_CUSTOMER_CHURN,
        company_id)
    end

    def sales_force_expenditure_per_100m(company_id)
      # TODO: this is kinda ugly, we just get per 1k and then multiply by 100k
      # to get per 100m
      metrics_per_1k(
        Metric::METRIC_SALES_FORCE_EXPENDITURE,
        Metric::METRIC_ANNUAL_REVENUE,
        company_id)
      .map do |metric|
        {
          value: round_value(metric[:value] * 100_000),
          value_description: Metric::METRIC_TO_VALUE_DESC[Metric::METRIC_SALES_FORCE_EXPENDITURE],
          year: metric[:year]
        }
      end
    end

    def net_new_rev_per_sales_rep(company_id)
      get_average_metric_presenter_by_year(
        Metric::METRIC_NET_NEW_REVENUE_PER_SALES_REP,
        company_id)
    end

    def customer_lifetime_value(company_id)
      # TODO: this is kinda ugly, we just get per 1k and then divide by 1k
      # to negate the 1k multiply
      metrics_per_1k(
        Metric::METRIC_ANNUAL_SPEND_PER_CUSTOMER,
        Metric::METRIC_AVERAGE_CUSTOMER_CHURN,
        company_id)
      .map do |metric|
        {
          value: round_value(metric[:value] / 1000),
          value_description: Metric::VALUE_DESC_USD,
          year: metric[:year]
        }
      end
    end

    # Get metrics per 1k (e.g. direct sales fte per 1k internal employees)
    def metrics_per_1k(metric_type, total_metric_type, company_id)
      metrics = Metric.where(
        metric_name: metric_type,
        company_id: company_id)

      total_metrics = Metric.where(
        metric_name: total_metric_type,
        company_id: company_id)

      metric_avg_per_year = average_metrics_by_year(metrics)
      total_metric_avg_per_year = average_metrics_by_year(total_metrics)

      metric_over_total_per_year = {}
      metric_avg_per_year.each do |year, value|
        if total_metric_avg_per_year.key?(year)
          metric_value = total_metric_avg_per_year[year]
          metric_over_total_per_year[year] = value / metric_value * 1000
        end
      end

      metric_over_total_per_year.map do |year, value|
        {
          value: round_value(value),
          value_description: total_metrics.first.value_description, # pick any
          year: year
        }
      end
    end

    # Get the # of accounts per sales rep from internally inputted data
    def internal_accounts_per_sales_rep(company_id)
      overall_sales_fte_metrics = Metric.where(
        metric_name: Metric::METRIC_OVERALL_SALES_FTE,
        company_id: company_id)

      total_customer_accounts_metrics = Metric.where(
        metric_name: Metric::METRIC_TOTAL_CUSTOMER_ACCOUNTS,
        company_id: company_id)

      all_metric_pairs = get_all_metric_pairs(
        total_customer_accounts_metrics,
        overall_sales_fte_metrics)
      year_to_average_value = average_pair_metrics_by_year(all_metric_pairs)

      year_to_average_value.map do |year, value|
        {
          value: round_value(value),
          value_description: overall_sales_fte_metrics.first.value_description, # pick any
          year: year
        }
      end
    end

    # Given a metric type, poop out yearly averages of that metric with value/desc/year presenter
    def get_average_metric_presenter_by_year(metric_type, company_id)
      metrics = Metric.where(
        metric_name: metric_type,
        company_id: company_id)

      avg_metrics_per_year = average_metrics_by_year(metrics)

      value_desc = Metric::METRIC_TO_VALUE_DESC[metric_type]

      avg_metrics_per_year.map do |year, num|
        {
          value: value_desc == Metric::VALUE_DESC_PERCENTAGE ? round_percentage(num) : round_value(num),
          value_description: Metric::METRIC_TO_VALUE_DESC[metric_type],
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

    # Average out metric pairs by year based on left / right and relevant_date.year
    def average_pair_metrics_by_year(metric_pairs)
      year_to_pairs = metric_pairs.group_by {
        |pair| pair.get_year
      }

      Hash[year_to_pairs
        .map { |year, pairs| [year, pairs.map(&:divide).reduce(:+) / pairs.size]}]
    end

    # Get metric pairs based on metric_batch values
    def get_all_metric_pairs(left_metrics, right_metrics)
      metric_batch_to_left_metrics = Hash[left_metrics
        .map { |metric| [metric.metric_batch, metric] }
        .select { |metric_batch, metric| metric_batch.present? }]
      metric_batch_to_right_metrics = Hash[right_metrics
        .map { |metric| [metric.metric_batch, metric] }
        .select { |metric_batch, metric| metric_batch.present? }]

      metric_batch_to_pair = {}
      metric_batch_to_left_metrics.each do |metric_batch, metric|
        if metric_batch_to_right_metrics.key?(metric_batch)
          metric_batch_to_pair[metric_batch] = MetricPair.new(
            metric,
            metric_batch_to_right_metrics[metric_batch])
        end
      end

      metric_batch_to_pair.values
    end

    # Round value to either an integer or two dec places
    def round_value(value)
      i, f = value.to_i, value.to_f
      i == f ? i : f.round(2)
    end

    # Round decimal to a percentage
    def round_percentage(decimal)
      (decimal * 100).round(2)
    end
  end
  #
  # TODO: verify with Vince that this is correct user behavior
  # TODO: move this out of metrics controller into somewhere more
  # encapsulated
  def form_metrics
    {
      data: {
        fields: [
          {
            title: "Annual Revenue",
            input_fields: [
              {
                title: "Annual Revenue",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_ANNUAL_REVENUE,
              }
            ]
          },
          {
            title: "Total Number of Employees",
            input_fields: [
              {
                title: "Total # of Employees",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_NUM_EMPLOYEES,
              }
            ],
          },
          {
            title: "Accounts Per Sales Rep",
            input_fields: [
              {
                title: "Accounts Per Sales Rep",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_NUM_EMPLOYEES,
              }
            ]
          },
          {
            title: "Direct Sales FTE",
            input_fields: [
              {
                title: "Total Direct Sales FTE",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_DIRECT_SALES_FTE
              },
            ]
          },
          {
            title: "Overall Sales FTE",
            input_fields: [
              {
                title: "Total Sales FTE",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_OVERALL_SALES_FTE
              },
            ]
          },
          {
            title: "Sales Support FTE",
            input_fields: [
              {
                title: "Total Sales Support FTE",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_SALES_SUPPORT_FTE
              },
            ]
          },
          {
            title: "Quota Per Sales Rep",
            input_fields: [
              {
                title: "Quota Per Sales Rep",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_QUOTA_PER_SALES_REP
              },
            ]
          },
          {
            title: "Sales Cycle Length",
            input_fields: [
              {
                title: "Sales Cycle Length",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_SALES_CYCLE_LENGTH
              },
            ]
          },
          {
            title: "Lead To Close Conversion Rate",
            input_fields: [
              {
                title: "Lead To Close Conversion Rate",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_LEAD_TO_CLOSE_CONVERSION_RATE
              },
            ]
          },
          {
            title: "Annual Spend Per Customer",
            input_fields: [
              {
                title: "Annual Spend Per Customer",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                metric_name: Metric::METRIC_ANNUAL_SPEND_PER_CUSTOMER
              },
            ]
          },
          {
            title: "Average Customer Churn Percentage",
            input_fields: [
              {
                title: "Average Customer Churn Percentage",
                description: "What percent of subscription customers turnover annually",
                metric_name: Metric::METRIC_AVERAGE_CUSTOMER_CHURN
              },
            ]
          },
          {
            title: "Sales Force Expenditure",
            input_fields: [
              {
                title: "Sales Force Expenditure",
                description: "How much money is spent per year on sales force",
                metric_name: Metric::METRIC_AVERAGE_CUSTOMER_CHURN
              },
            ]
          },
          {
            title: "Net New Revenue Per Sales Rep",
            input_fields: [
              {
                title: "Net New Revenue Per Sales Rep",
                description: "How many $ in new revenue does an average sales rep bring in annually",
                metric_name: Metric::METRIC_NET_NEW_REVENUE_PER_SALES_REP
              },
            ]
          }
        ]
      }
    }
  end
  module_function :form_metrics

end

# Helper class used to group natural pairs of metrics (e.g. a user enters in a pair
# of sales FTE employees followed by the total customer accounts metrics).
class MetricPair
  def initialize(left, right)
    @left = left
    @right = right
  end

  # Left / Right
  def divide
    @left.value / @right.value.to_f
  end

  # Since these pairs should be submitted at the same time,
  # both years work
  def get_year
    @left.relevant_date.year
  end
end
