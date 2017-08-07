class MetricUnit < ApplicationRecord
  # A Metric Unit is a unit that consists of one or more metrics that
  # show up on the metrics dashboard. Each metric is an individual
  # datapoint submitted by a user. A metric unit is an entire
  # presentable metric to a customer. A customer can purchase
  # metric units.
  has_many :permissions
  
  MU_REVENUE = "mu_revenue"
  MU_EMPLOYEES = "mu_employees"
  MU_REVENUE_PER_EMPLOYEE = "mu_revenue_per_employee"
  MU_OVERALL_SALES_PER_FTE = "mu_overall_sales_per_fte"
  MU_DIRECT_SALES_PER_FTE = "mu_direct_sales_per_fte"
  MU_ACCOUNTS_PER_SALES_REP = "mu_accounts_per_sales_rep"
  MU_SALES_SUPPORT_PER_FTE = "mu_sales_support_per_fte"

  MU_TOTAL_METRIC_UNITS = [
    MU_REVENUE,
    MU_EMPLOYEES,
    MU_REVENUE_PER_EMPLOYEE,
    MU_OVERALL_SALES_PER_FTE,
    MU_DIRECT_SALES_PER_FTE,
    MU_ACCOUNTS_PER_SALES_REP,
    MU_SALES_SUPPORT_PER_FTE
  ]
end
