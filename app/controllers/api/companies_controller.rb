class Api::CompaniesController < ApplicationController

  # TODO: Remove this if we get hella companies obv
  def index
    render_all_companies
  end

  # Using json style guide https://google.github.io/styleguide/jsoncstyleguide.xml
  def show
    company = Company.find_by_id(params[:id])
    if company.blank?
      render(
        json: {
          error: {
            code: 404,
            message: "Company not found",
            errors: {
              message: "Company not found"
            }
          }
        })
      return
    end

    render json: {
      data: {
        kind: Company.name,
        id: company.id,
        company: company.as_json(include: :industry)
      }
    }
  end

  def search
    query = params[:q]

    if query.blank?
      render_all_companies
      return
    end

    companies = Company.where('name ILIKE ?', "%#{query}%").order('id DESC')
    # TODO: this search sucks since we grab a bunch of rando companies.
    # Disable this for now
    # external_companies = Api::CompaniesHelper.search_external_companies(query)
    total_companies = companies # + external_companies
    render(json: {
        data: {
          kind: Company.name,
          items: total_companies.map { |c| c.as_json(include: :industry) }
        }
      })
  end

  def render_all_companies
    render json: {
      data: {
        kind: Company.name,
        items: Company.all.map { |c| c.as_json(include: :industry) }
      }
    }
  end
end