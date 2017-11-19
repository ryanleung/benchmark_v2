class Api::CompaniesController < ApplicationController

  def index
    if params[:page]
      render_companies_by_page(Company.order(:name), params[:page])
      return
    end

    render_companies_by_page(Company.order(:name), 1)
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
    page = params[:page] or 1

    if query.blank?
      render_companies_by_page(Company.order(:name), 1)
      return
    end

    company_query = Company.where('name ILIKE ?', "%#{query}%").order('id DESC')
    # TODO: this search sucks since we grab a bunch of rando companies.
    # Disable this for now
    # external_companies = Api::CompaniesHelper.search_external_companies(query)
    # total_companies = companies + external_companies
    render_companies_by_page(company_query, page)
  end

  def render_companies_by_page(company_query, page)
    if company_query.page(page).out_of_range?
      render json: {
        error: {
          code: 400,
          message: "Page out of range",
          errors: {
            message: "Page out of range"
          }
        }
      }
      return
    end

    requested_page = company_query.page(page)
    items_per_page = requested_page.limit_value
    next_page = requested_page.next_page
    prev_page = requested_page.prev_page
    total_pages = requested_page.total_pages
    current_item_count = requested_page.count

    render json: {
      data: {
        kind: Company.name,
        items: requested_page.map { |c| c.as_json(include: :industry) },
        current_item_count: current_item_count,
        items_per_page: items_per_page,
        start_index: 1,
        page_index: page,
        next_page: next_page,
        prev_page: prev_page,
        total_pages: total_pages
      }
    }
  end
end