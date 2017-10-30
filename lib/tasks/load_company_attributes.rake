require 'csv'

desc "Load company attributes from Company Screening Report -- last updated Oct 29, 2017"
task :load_company_attributes => :environment do
  csv_file = File.join(Rails.root, "lib", "resources", "Company Screening Report.xls - Screening.csv")
  ActiveRecord::Base.transaction do
    begin
      CSV.foreach(csv_file, :headers => true) do |row|
        puts row
        puts '\n'
        company_name_with_ticker = row["Company Name"]
        ticker = row["Exchange:Ticker"]
        industry_type = row["Industry Classifications"]
        website_url = row["Website"]
        primary_address = row["Primary Address"]

        # 1. Strip company names of their ticker information (e.g. 2U, Inc. (NasdaqGS:TWOU))
        company_name = company_name_with_ticker.split("(")[0].strip

        # 2. Get logo url from Clearbit API
        # TODO: in the future, store in our AWS bucket
        image_url = "https://logo.clearbit.com/#{website_url}?size=150&format=png"

        # 3. Save company in DB
        # TODO: chnage industry id
        company = Company.create name: company_name, logo_img_url: image_url, industry_id: 1
      end
    rescue => e
      byebug
    end
  end
end