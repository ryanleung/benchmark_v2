import { connect } from 'react-redux';

import { fetchCompanies, searchCompanies } from '../../actions/company_actions'
import ExplorePage from './explore_page';

const mapStateToProps = state => {
  const { items, errors } = state.companies
  return {
    companies: items,
    errors: errors
  };
};


const mapDispatchToProps = dispatch => ({
  fetchCompanies: industry_id => dispatch(fetchCompanies(industry_id)),
  searchCompanies: search_query => dispatch(searchCompanies(search_query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorePage);