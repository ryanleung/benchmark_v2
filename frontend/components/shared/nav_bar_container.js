import { connect } from 'react-redux'
import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar'

const mapStateToProps = state => {
  const { company, errors } = state.viewingCompany
  return {
    company: company,
    currentUser: state.session.currentUser,
    errors: errors
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
