import { connect } from 'react-redux';

import { fetchCompany } from '../../actions/company_actions'
import CompanyPage from './company_page';

const mapStateToProps = state => {
  const { company, errors } = state.viewingCompany
  return {
    company,
    errors
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCompany: company_id => dispatch(fetchCompany(company_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPage);
