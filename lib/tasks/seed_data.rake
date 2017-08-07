desc "Seed sample data -- last updated June 1, 2017"
task :seed_data => :environment do
  Rake::Task["db:drop"].invoke
  Rake::Task["db:create"].invoke
  Rake::Task["db:migrate"].invoke

  ActiveRecord::Base.transaction do
    MetricUnit::MU_TOTAL_METRIC_UNITS.each do |unit|
      MetricUnit.create! name: unit
    end

    tech_industry = Industry.create name: "Tech"
    user = User.create name: "Vincent Vo",
                       email: "vincent.vo@gmail.com",
                       password: "vincent",
                       account_type: User::ACCOUNT_TYPE_SUPERUSER

    free_user = User.create name: "Ryan Leung",
                            email: "ryanleung@gmail.com",
                            password: "ryanleung",
                            account_type: User::ACCOUNT_TYPE_FREE_USER

    metric_type_org = MetricType.create name: "Org"

    # COMPANY 1: GOOGLE
    company = Company.create name: "Google",
                             industry_id: tech_industry.id,
                             url: "www.google.com",
                             city: "Mountain View",
                             state: "CA",
                             logo_img_url: "https://media.glassdoor.com/sql/9079/google-squarelogo-1441130773284.png"

    business_unit = BusinessUnit.create name: "Google Maps",
                                        company_id: company.id

    metric = Metric.create metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 5,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2016')

    metric = Metric.create metric_name: Metric::METRIC_ACCOUNTS_PER_SALES_REP,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 7,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 900000000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 500000000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2016')

    metric = Metric.create metric_name: Metric::METRIC_DIRECT_SALES_FTE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 10000,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_NUM_EMPLOYEES,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 17500,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_NUM_WEB_EMPLOYEES,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 100000,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_OVERALL_SALES_FTE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 50000,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_SALES_SUPPORT_FTE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 10000,
                           value_description: Metric::VALUE_DESC_QUANTITY,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    metric = Metric.create metric_name: Metric::METRIC_TOTAL_CUSTOMER_ACCOUNTS,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 40000,
                           value_description: "accounts",
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    # COMPANY 2: DROPBOX
    company = Company.create name: "Dropbox",
                             industry_id: tech_industry.id,
                             url: "www.dropbox.com",
                             city: "San Francisco",
                             state: "CA",
                             logo_img_url: "https://media.glassdoor.com/sql/415350/dropbox-squarelogo-1400485499977.png"

    business_unit = BusinessUnit.create name: "Dropbox For Business",
                                        company_id: company.id

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 120000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    # COMPANY 3: SQUARE
    company = Company.create name: "Square",
                             industry_id: tech_industry.id,
                             url: "www.squareup.com",
                             city: "San Francisco",
                             state: "CA",
                             logo_img_url: "https://media.glassdoor.com/sql/422050/square-squarelogo-1481161604552.png"

    business_unit = BusinessUnit.create name: "Square Capital",
                                        company_id: company.id

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 120000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    # COMPANY 4: FACEBOOK
    company = Company.create name: "Facebook",
                         industry_id: tech_industry.id,
                         url: "www.facebook.com",
                         city: "Menlo Park",
                         state: "CA",
                         logo_img_url: "https://media.glassdoor.com/sql/40772/facebook-squarelogo-1381810479272.png"

    business_unit = BusinessUnit.create name: "Messenger",
                                        company_id: company.id

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 120000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')

    # COMPANY 5: Lyft
    company = Company.create name: "Lyft",
                         industry_id: tech_industry.id,
                         url: "www.lyft.com",
                         city: "San Francisco",
                         state: "CA",
                         logo_img_url: "https://media.glassdoor.com/sql/700614/lyft-squarelogo-1470951814636.png"

    business_unit = BusinessUnit.create name: "Dispatch",
                                        company_id: company.id

    metric = Metric.create metric_name: Metric::METRIC_ANNUAL_REVENUE,
                           metric_type_id: metric_type_org.id,
                           function: Metric::FUNCTION_ENGINEERING,
                           user_id: user.id,
                           company_id: company.id,
                           business_unit_id: business_unit.id,
                           value: 120000,
                           value_description: Metric::VALUE_DESC_USD,
                           geo: "US",
                           relevant_date: Date.parse('19-03-2017')
  end
end
