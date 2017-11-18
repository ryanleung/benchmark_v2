# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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

  metric = Metric.create metric_name: Metric::METRIC_QUOTA_PER_SALES_REP,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 10000,
                         value_description: Metric::VALUE_DESC_USD,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')

  metric = Metric.create metric_name: Metric::METRIC_SALES_CYCLE_LENGTH,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 10000,
                         value_description: Metric::VALUE_DESC_MONTHS,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')

  metric = Metric.create metric_name: Metric::METRIC_LEAD_TO_CLOSE_CONVERSION_RATE,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 10,
                         value_description: Metric::VALUE_DESC_PERCENTAGE,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')                           

  metric = Metric.create metric_name: Metric::METRIC_ANNUAL_SPEND_PER_CUSTOMER,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 10000,
                         value_description: Metric::VALUE_DESC_USD,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')

  metric = Metric.create metric_name: Metric::METRIC_AVERAGE_CUSTOMER_CHURN,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 0.2,
                         value_description: Metric::VALUE_DESC_PERCENTAGE,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')

  metric = Metric.create metric_name: Metric::METRIC_SALES_FORCE_EXPENDITURE,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 900000,
                         value_description: Metric::VALUE_DESC_USD,
                         geo: "US",
                         relevant_date: Date.parse('19-03-2017')

  metric = Metric.create metric_name: Metric::METRIC_NET_NEW_REVENUE_PER_SALES_REP,
                         metric_type_id: metric_type_org.id,
                         function: Metric::FUNCTION_ENGINEERING,
                         user_id: user.id,
                         company_id: company.id,
                         business_unit_id: business_unit.id,
                         value: 1234567,
                         value_description: Metric::VALUE_DESC_USD,
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

  csv_file = File.join(Rails.root, "lib", "resources", "Company Screening Report.xls - Screening.csv")
  CSV.foreach(csv_file, :headers => true) do |row|
    company_name_with_ticker = row["Company Name"]
    ticker = row["Exchange:Ticker"]
    industry_type = row["Industry Classifications"]
    website_url = row["Website"]
    primary_address = row["Primary Address"]

    # 1. Strip company names of their ticker information (e.g. 2U, Inc. (NasdaqGS:TWOU))
    company_name = company_name_with_ticker.split("(")[0].strip

    # 2. Get logo url from Clearbit API
    # TODO: in the future, store in our AWS bucket
    image_url = "https://logo.clearbit.com/#{website_url}"

    # 3. Parse city and state from company
    # "Headquarters\n7900 Harkins Road \nLanham, Maryland    20706\nUnited States\nMain Phone: 301-892-4350"
    # ==> ["Lanham", "Maryland    20706"]
    state_regex = "(Alabama|Alaska|Arizona|Arkansas|British\sColumbia|California|Colorado|Connecticut|Delaware|District\sOf\sColumbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma|Ontario|Oregon|Pennsylvania|Puerto\sRico|Rhode\sIsland|Quebec|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming)"
    parsed_addr_match = /\n.+, #{state_regex}.+\n/.match(primary_address)
    parsed_addr_arr = parsed_addr_match[0].strip().split(',')
    city = parsed_addr_arr[0].strip()

    # "Maryland    207906" ==> "Maryland"
    state = parsed_addr_arr[1].split('   ')[0].strip()

    # 4. Save company in DB
    # TODO: change industry id
    company = Company.create! name: company_name, logo_img_url: image_url, industry_id: 1, city: city, state: state, url: website_url.strip()
  end

  csv_file = File.join(Rails.root, "lib", "resources", "Tech basic info.xls - Screening.csv")
  CSV.foreach(csv_file, :headers => true) do |row|
    company_name_with_ticker = row["Company Name"]
    industry_type = row["Industry Classifications"]
    total_employees_datum = row["Total Employees [Latest Annual]"]
    total_revenue_datum = row["Total Revenue [LTM] ($USDmm, Historical rate)"]

    # 1. Strip company names of their ticker information (e.g. 2U, Inc. (NasdaqGS:TWOU))
    company_name = company_name_with_ticker.split("(")[0].strip

    # 2. Strip revenue string/random stuff (e.g. "  1,164.0 " (in the millions))
    total_revenue = total_revenue_datum.strip.gsub(',','').to_f * 1_000_000

    # 3. Strip employee string/random stuff (e.g. "  239.1 ")
    total_employees = total_employees_datum.strip.gsub(',','').to_i

    # 4. If we have a company that was created from the previous csv based on name,
    # we insert the metrics for that company
    company = Company.find_by_name(company_name)
    if !company.present?
      next
    end

    Metric.create! metric_name: Metric::METRIC_ANNUAL_REVENUE,
                 user_id: user.id,
                 company_id: company.id,
                 value: total_revenue,
                 value_description: Metric::VALUE_DESC_USD,
                 geo: "US",
                 relevant_date: Date.parse('19-03-2017')
    Metric.create! metric_name: Metric::METRIC_NUM_EMPLOYEES,
                  user_id: user.id,
                  company_id: company.id,
                  value: total_employees,
                  value_description: Metric::VALUE_DESC_QUANTITY,
                  geo: "US",
                  relevant_date: Date.parse('19-03-2017')
  end
end
