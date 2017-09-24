export const getCompanies = (industry_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/industries/${industry_id}/companies`
  });
};

export const getCompany = (company_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/companies/${company_id}`
  });
};

export const searchCompanies = (search_query) => {
  return $.ajax({
    method: 'GET',
    url: `/api/companies/search?q=${search_query}`
  })
}