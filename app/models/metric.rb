class Metric < ApplicationRecord
  METRIC_ANNUAL_REVENUE = "annual_revenue"
  METRIC_DIRECT_SALES_FTE = "num_direct_sales_fte"
  METRIC_NUM_EMPLOYEES = "num_employees"
  METRIC_NUM_WEB_EMPLOYEES = "num_web_employees"
  METRIC_OVERALL_SALES_FTE = "num_overall_sales_fte"
  METRIC_SALES_SUPPORT_FTE = "num_sales_support_fte"
  METRIC_TOTAL_CUSTOMER_ACCOUNTS = "total_num_customer_accounts"

  # Metrics that were generated exclusively internally
  INTERNALLY_GENERATED_METRICS = [
    METRIC_NUM_WEB_EMPLOYEES,
    METRIC_TOTAL_CUSTOMER_ACCOUNTS
  ]

  FUNCTION_ENGINEERING = "Engineering"

  has_many :metrics
  belongs_to :metric_type
  belongs_to :company
  belongs_to :industry
  belongs_to :user
  belongs_to :business_unit
end
