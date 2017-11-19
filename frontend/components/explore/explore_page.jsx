import React, {Component, PropTypes} from 'react';
import Button from 'material-ui/Button';
import { grey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import * as APIUtil from '../../api/company_api_util'
import CompanyTableView from '../company/company_table_view'
import SearchBar from '../search/search_bar'

const styles = theme => ({
  explorePage: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: grey[300],
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  searchCompanySection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
    width: '49%',
  },
  analysisSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    width: '48%',
  },
  searchBar: {
    marginTop: 10,
    width: '90%',
  },
  tableView: {
    width: '100%',
  },
  compareCompButton: {

  }
})


class ExplorePage extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    this.props.fetchCompanies(1) // TODO: hardcoded as Tech industry
  }

  handleSearch(query) {
    this.props.searchCompanies(query)
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.explorePage}>
        <Paper className={classes.headerSection}>
          <h1>Explore Data</h1>
          <h3>Understand sales and marketing performance metrics for any company.</h3>
        </Paper>
        <Paper className={classes.searchCompanySection}>
          <h2>Explore By Company</h2>
          <div className={classes.searchBar}>
            <SearchBar onSearch={this.handleSearch}/>
          </div>
          <h2>Companies</h2>
          <CompanyTableView className={classes.tableView} companies={this.props.companies} />
        </Paper>
        <Paper className={classes.analysisSection}>
          <h2>Analyze Across Companies</h2>
          <Button raised color="primary" className={classes.compareCompButton}>
            Compare companies: Benchmark
          </Button>
          <br />
          <h2>Popular Industries</h2>
          <h3>Software as a service (SaaS)</h3>
          <h3>Human capital management software (HCM)</h3>
          <h3>Customer relationship management software (CRM)</h3>
        </Paper>
      </div>
    )
  }
}

ExplorePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExplorePage);
