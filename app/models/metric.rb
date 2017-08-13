class Metric < ApplicationRecord
  METRIC_ACCOUNTS_PER_SALES_REP = "accounts_per_sales_rep"
  METRIC_ANNUAL_SPEND_PER_CUSTOMER = "annual_spend_per_customer"
  METRIC_ANNUAL_REVENUE = "annual_revenue"
  METRIC_DIRECT_SALES_FTE = "num_direct_sales_fte"
  METRIC_LEAD_TO_CLOSE_CONVERSION_RATE = "lead_to_close_conversion_rate"
  METRIC_NUM_EMPLOYEES = "num_employees"
  METRIC_NUM_WEB_EMPLOYEES = "num_web_employees"
  METRIC_OVERALL_SALES_FTE = "num_overall_sales_fte"
  METRIC_SALES_CYCLE_LENGTH = "sales_cycle_length"
  METRIC_SALES_SUPPORT_FTE = "num_sales_support_fte"
  METRIC_TOTAL_CUSTOMER_ACCOUNTS = "total_num_customer_accounts"
  METRIC_QUOTA_PER_SALES_REP = "quota_per_sales_rep"

  TOTAL_METRICS = [
    METRIC_ACCOUNTS_PER_SALES_REP,
    METRIC_ANNUAL_SPEND_PER_CUSTOMER,
    METRIC_ANNUAL_REVENUE,
    METRIC_DIRECT_SALES_FTE,
    METRIC_LEAD_TO_CLOSE_CONVERSION_RATE,
    METRIC_NUM_EMPLOYEES,
    METRIC_NUM_WEB_EMPLOYEES,
    METRIC_OVERALL_SALES_FTE,
    METRIC_SALES_CYCLE_LENGTH,
    METRIC_SALES_SUPPORT_FTE,
    METRIC_TOTAL_CUSTOMER_ACCOUNTS,
    METRIC_QUOTA_PER_SALES_REP
  ]

  # Metrics that were generated exclusively internally
  INTERNALLY_GENERATED_METRICS = [
    METRIC_NUM_WEB_EMPLOYEES
  ]

  FUNCTION_ENGINEERING = "Engineering"

  VALUE_DESC_MONTHS = "Months"
  VALUE_DESC_QUANTITY = "Quantity"
  VALUE_DESC_PERCENTAGE = "Percentage"
  VALUE_DESC_USD = "USD"

  TOTAL_VALUE_DESCS =  [
    VALUE_DESC_MONTHS,
    VALUE_DESC_QUANTITY,
    VALUE_DESC_PERCENTAGE,
    VALUE_DESC_USD
  ]

  METRIC_TO_VALUE_DESC = Hash[
    METRIC_ACCOUNTS_PER_SALES_REP => VALUE_DESC_QUANTITY,
    METRIC_ANNUAL_SPEND_PER_CUSTOMER => VALUE_DESC_USD,
    METRIC_ANNUAL_REVENUE => VALUE_DESC_USD,
    METRIC_DIRECT_SALES_FTE => VALUE_DESC_QUANTITY,
    METRIC_LEAD_TO_CLOSE_CONVERSION_RATE => VALUE_DESC_PERCENTAGE,
    METRIC_NUM_EMPLOYEES => VALUE_DESC_QUANTITY,
    METRIC_NUM_WEB_EMPLOYEES => VALUE_DESC_QUANTITY,
    METRIC_OVERALL_SALES_FTE => VALUE_DESC_QUANTITY,
    METRIC_SALES_CYCLE_LENGTH => VALUE_DESC_MONTHS,
    METRIC_SALES_SUPPORT_FTE => VALUE_DESC_QUANTITY,
    METRIC_TOTAL_CUSTOMER_ACCOUNTS => VALUE_DESC_QUANTITY,
    METRIC_QUOTA_PER_SALES_REP => VALUE_DESC_USD
  ]

  has_many :metrics
  belongs_to :metric_type, optional: true
  belongs_to :company
  belongs_to :user, optional: true
  belongs_to :business_unit, optional: true

  validates :metric_name, inclusion: { in: TOTAL_METRICS,
    message: "%{value} is not a valid metric name" }
  validates :value_description, inclusion: { in: TOTAL_VALUE_DESCS,
    message: "%{value} is not a valid value description" }
end
