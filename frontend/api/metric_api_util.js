export const postMetric = (company_id, metrics) => {
  return $.ajax({
    method: 'POST',
    url: `/api/companies/${company_id}/metrics`,
    data: metrics
  });
};

export const getMetrics = (company_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/companies/${company_id}/metrics_dashboard`
  })
}

export const getMetricNames = company_id => {
  return $.ajax({
    method: 'GET',
    url: `/api/companies/${company_id}/form_metrics`
  })
}
