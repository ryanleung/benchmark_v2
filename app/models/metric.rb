class Metric < ApplicationRecord
  METRIC_ACCOUNTS_PER_SALES_REP = "accounts_per_sales_rep"
  METRIC_ANNUAL_REVENUE = "annual_revenue"
  METRIC_DIRECT_SALES_FTE = "num_direct_sales_fte"
  METRIC_NUM_EMPLOYEES = "num_employees"
  METRIC_NUM_WEB_EMPLOYEES = "num_web_employees"
  METRIC_OVERALL_SALES_FTE = "num_overall_sales_fte"
  METRIC_SALES_SUPPORT_FTE = "num_sales_support_fte"
  METRIC_TOTAL_CUSTOMER_ACCOUNTS = "total_num_customer_accounts"

  TOTAL_METRICS = [
    METRIC_ACCOUNTS_PER_SALES_REP,
    METRIC_ANNUAL_REVENUE,
    METRIC_DIRECT_SALES_FTE,
    METRIC_NUM_EMPLOYEES,
    METRIC_NUM_WEB_EMPLOYEES,
    METRIC_OVERALL_SALES_FTE,
    METRIC_SALES_SUPPORT_FTE,
    METRIC_TOTAL_CUSTOMER_ACCOUNTS
  ]

  # Metrics that were generated exclusively internally
  INTERNALLY_GENERATED_METRICS = [
    METRIC_NUM_WEB_EMPLOYEES
  ]

  FUNCTION_ENGINEERING = "Engineering"

  VALUE_DESC_QUANTITY = "Quantity"
  VALUE_DESC_USD = "USD"

  TOTAL_VALUE_DESCS =  [
    VALUE_DESC_QUANTITY,
    VALUE_DESC_USD
  ]

  METRIC_TO_VALUE_DESC = Hash[
    METRIC_ACCOUNTS_PER_SALES_REP => VALUE_DESC_QUANTITY,
    METRIC_ANNUAL_REVENUE => VALUE_DESC_USD,
    METRIC_DIRECT_SALES_FTE => VALUE_DESC_QUANTITY,
    METRIC_NUM_EMPLOYEES => VALUE_DESC_QUANTITY,
    METRIC_NUM_WEB_EMPLOYEES => VALUE_DESC_QUANTITY,
    METRIC_OVERALL_SALES_FTE => VALUE_DESC_QUANTITY,
    METRIC_SALES_SUPPORT_FTE => VALUE_DESC_QUANTITY,
    METRIC_TOTAL_CUSTOMER_ACCOUNTS => VALUE_DESC_QUANTITY
  ]

  has_many :metrics
  has_many :permissions
  belongs_to :metric_type, optional: true
  belongs_to :company
  belongs_to :user, optional: true
  belongs_to :business_unit, optional: true

  validates :metric_name, inclusion: { in: TOTAL_METRICS,
    message: "%{value} is not a valid metric name" }
  validates :value_description, inclusion: { in: TOTAL_VALUE_DESCS,
    message: "%{value} is not a valid value description" }
end
