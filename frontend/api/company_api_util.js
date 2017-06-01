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