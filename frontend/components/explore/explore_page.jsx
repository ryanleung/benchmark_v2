import React, {Component, PropTypes} from 'react';
import Button from 'material-ui/Button';
import { grey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import * as APIUtil from '../../api/company_api_util'
import CompanyTableView from '../company/company_table_view'
import SearchBar from '../search/search_bar'

const styles = theme => ({
  exploreContainer: {
    width: 1000,
    height: 950,
    margin: [0, "auto"]
  },
  explorePage: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
  },
  headerSection: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  searchCompanySection: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '49%',
    height: '100%',
  },
  analysisSection: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '48%',
    height: '100%',
  },
  searchBar: {
    marginTop: 10,
    width: '90%',
  },
  tableView: {
    width: '100%',
    overflow: 'scroll',
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
      <div className={classes.exploreContainer}>
        <div className={classes.explorePage}>
          <div className={classes.headerSection}>
            <h1>Explore Data</h1>
            <h3>Understand sales and marketing performance metrics for any company.</h3>
          </div>
          <div className={classes.searchCompanySection}>
            <h2>Explore By Company</h2>
            <div className={classes.searchBar}>
              <SearchBar onSearch={this.handleSearch}/>
            </div>
            <h2>Companies</h2>
            <div className={classes.tableView}>
              <CompanyTableView companies={this.props.companies} />
            </div>
          </div>
          <div className={classes.analysisSection}>
            <h2>Analyze Across Companies</h2>
            <Button raised color="primary" className={classes.compareCompButton}>
              Compare companies: Benchmark
            </Button>
            <br />
            <h2>Popular Industries</h2>
            <h3>Software as a service (SaaS)</h3>
            <h3>Human capital management software (HCM)</h3>
            <h3>Customer relationship management software (CRM)</h3>
          </div>
        </div>
      </div>
    )
  }
}

ExplorePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExplorePage);
