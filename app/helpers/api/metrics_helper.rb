module Api::MetricsHelper

  # Take a company, poop out their metrics dashboard.
  def metrics_dashboard(company_id)
    {
      annual_revenue: annual_revenue(company_id),
      accounts_per_sales_rep: accounts_per_sales_rep(company_id)
      direct_sales_reps_per_1k_fte: direct_sales_reps_fte_per_1k_fte(company_id),
      overall_sales_fte_role_breakdown: overall_sales_fte_role_breakdown(company_id),
      overall_sales_per_1k_fte: overall_sales_fte_per_1k_fte(company_id),
      revenue_per_employee: revenue_per_employee(company_id),
      sales_support_per_1k_fte: sales_support_per_1k_fte(company_id),
      total_num_employees: total_num_employees(company_id),
    }
  end

  def annual_revenue(company_id)
    {}
  end

  def accounts_per_sales_rep(company_id)
    {}
  end

  def direct_sales_reps_fte_per_1k_fte(company_id)
    {}
  end

  def overall_sales_fte_role_breakdown(company_id)
    {}
  end

  def overall_sales_fte_per_1k_fte(company_id)
  end

  def revenue_per_employee(company_id)
  end

  def sales_support_per_1k_fte(company_id)
  end

  def total_num_employees(company_id)
  end
end