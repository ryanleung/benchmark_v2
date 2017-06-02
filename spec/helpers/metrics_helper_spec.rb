require 'database_cleaner'
require 'rails_helper'

describe Api::MetricsHelper do

  before :each do
    # TODO: move these to fixtures and DRY this up :(
    tech_industry = Industry.create name: "Tech"
    metric_type_org = MetricType.create name: "Org" 
    company = Company.create name: "Google",
                       industry_id: tech_industry.id,
                       url: "www.google.com",
                       city: "Mountain View",
                       state: "CA",
                       logo_img_url: "test"

    Metric.create metric_name: Metric::METRIC_DIRECT_SALES_FTE,
                   metric_type_id: metric_type_org.id,
                   company_id: company.id,
                   value: 10000,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

    Metric.create metric_name: Metric::METRIC_NUM_EMPLOYEES,
                   metric_type_id: metric_type_org.id,
                   company_id: company.id,
                   value: 17500,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

    Metric.create metric_name: Metric::METRIC_NUM_WEB_EMPLOYEES,
                   metric_type_id: metric_type_org.id,
                   company_id: company.id,
                   value: 100000,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

    Metric.create metric_name: Metric::METRIC_OVERALL_SALES_FTE,
                   metric_type_id: metric_type_org.id,
                   company_id: company.id,
                   value: 50000,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

    Metric.create metric_name: Metric::METRIC_SALES_SUPPORT_FTE,
                   metric_type_id: metric_type_org.id,
                   company_id: company.id,
                   value: 10000,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

    Metric.create metric_name: Metric::METRIC_TOTAL_CUSTOMER_ACCOUNTS,
                   metric_type_id: metric_type_org.id,
                   function: Metric::FUNCTION_ENGINEERING,
                   company_id: company.id,
                   value: 40000,
                   value_description: "accounts",
                   relevant_date: Date.parse('19-03-2017')

    @company_id = company.id
    @metric_type_id = metric_type_org.id
  end

  describe '#annual_revenue' do
    it 'performs basic example' do
      Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 500000000,
                   value_description: Metric::VALUE_DESC_USD,
                   relevant_date: Date.parse('19-03-2016')

      Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 400000000,
                   value_description: Metric::VALUE_DESC_USD,
                   relevant_date: Date.parse('19-03-2016')

      Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 400000000,
                   value_description: Metric::VALUE_DESC_USD,
                   relevant_date: Date.parse('19-03-2015')

      actual = annual_revenue(@company_id)

      expect(actual).to eql([
        {:value=>450000000.0, :value_description=>Metric::VALUE_DESC_USD, :year=>2016},
        {:value=>400000000.0, :value_description=>Metric::VALUE_DESC_USD, :year=>2015}])
    end
  end

  describe '#accounts_per_sales_rep' do
    it 'basic example with metric_accounts_per_sales_rep' do
      Metric.create metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 5,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2016')

      Metric.create metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 7,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

      Metric.create metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
                   metric_type_id: @metric_type_id,
                   company_id: @company_id,
                   value: 9,
                   value_description: Metric::VALUE_DESC_QUANTITY,
                   relevant_date: Date.parse('19-03-2017')

      actual = accounts_per_sales_rep(@company_id)

      expect(actual).to eql([
        {:value=>5.0, :value_description=>Metric::VALUE_DESC_QUANTITY, :year=>2016},
        {:value=>8.0, :value_description=>Metric::VALUE_DESC_QUANTITY, :year=>2017}])
    end
  end
end