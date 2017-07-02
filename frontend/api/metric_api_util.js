export const postMetric = (company_id, metric) => {
  return $.ajax({
    method: 'POST',
    url: `/api/companies/${company_id}/metrics`,
    data: metric.to_json()
  });
};