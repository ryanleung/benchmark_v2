class Metric < ApplicationRecord
  METRIC_ACCOUNTS_PER_SALES_REP = "accounts_per_sales_rep"
  METRIC_ANNUAL_REVENUE = "annual_revenue"
  METRIC_DIRECT_SALES_FTE = "num_direct_sales_fte"
  METRIC_NUM_EMPLOYEES = "num_employees"
  METRIC_NUM_WEB_EMPLOYEES = "num_web_employees"
  METRIC_OVERALL_SALES_FTE = "num_overall_sales_fte"
  METRIC_SALES_SUPPORT_FTE = "num_sales_support_fte"
  METRIC_TOTAL_CUSTOMER_ACCOUNTS = "total_num_customer_accounts"

  # Metrics that were generated exclusively internally
  INTERNALLY_GENERATED_METRICS = [
    METRIC_NUM_WEB_EMPLOYEES
  ]

  FUNCTION_ENGINEERING = "Engineering"

  VALUE_DESC_FTE = "FTE"
  VALUE_DESC_USD = "USD"

  has_many :metrics
  belongs_to :metric_type
  belongs_to :company
  belongs_to :user, optional: true
  belongs_to :business_unit, optional: true
end
