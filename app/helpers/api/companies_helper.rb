require 'json'
require 'net/http'

module Api::CompaniesHelper
  def search_external_companies(query)
    # We use Clearbit's API currently (https://clearbit.com/docs#autocomplete-api).
    # TODO: We should scrape from their API and store the logos internally
    # in something like S3 e.g.
    # $companies = array(
    #     'facebook.com',
    #     'google.com',
    #     'oracle.com',
    #     'amazon.com',
    #     'ebay.com',
    #     'uber.com',
    #     'twitter.com',
    #     'github.com'
    # );

    # foreach($companies as $company){

    #     $url = "https://logo.clearbit.com/{$company}?size=150&format=png";
    #     $contents = file_get_contents($url);
    #     file_put_contents('logos/' . $company . '.png' , $contents);

    # }

    # TODO: Move this to a generalized http library
    if query.empty?
      return []
    end
     
    begin
      url = URI.parse("https://autocomplete.clearbit.com/v1/companies/suggest?query=#{query}")
      req = Net::HTTP::Get.new(url.to_s)
      http = Net::HTTP.new(url.host, url.port) 
      http.use_ssl = (url.scheme == "https")
      res = http.request(req)
    rescue Exception
      logger.warn "Failed to fetch from url #{url}"
      return []
    end

    if res.code == "200"
      json_result = JSON.parse(res.body)
      return json_result.collect { |result| 
        Company.new(
          id: nil, # TODO: Temporary...we should make some external company model
          name: result["name"],
          logo_img_url: result["logo"], 
          url: result["domain"])
      }
    else
      logger.warn "Response failed from Clearbit API"
      return []
    end

  end
  module_function :search_external_companies

end
