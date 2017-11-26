import React, {Component, PropTypes} from 'react';
import Button from 'material-ui/Button';
import { grey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import * as APIUtil from '../../api/company_api_util'
import * as APIUtilMetric from '../../api/metric_api_util'
import CompanyTableView from '../company/company_table_view'
import MetricsTable from '../metrics/metrics_table'
import SearchBar from '../search/search_bar'
import Typography from 'material-ui/Typography';

const styles = theme => ({
  exploreContainer: {
    width: 1200,
    height: 500,
    margin: [0, "auto"]
  },
  explorePage: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
  },
  headerSection: {
    padding: 8,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: 150,
    width: '100%',
  },
  headerTitle: {
    fontWeight: "bold",
  },
  metricsTableSection: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    height: '100%',
  },
  companyTableView: {
    zIndex: 100,
    marginTop: 80,
    marginLeft: -20,
    position: "absolute",
    overflow: 'scroll',
  },
  searchBar: {
    margin: [30, 0],
    width: '50%',
  },
  tableView: {
    width: '100%',
    overflow: 'scroll',
  },
  metricSelect: {
    margin: 20,
  },
  metricGroupButton: {
    margin: 8,
  }
})


class ExplorePage extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCompanyClick = this.handleCompanyClick.bind(this)
    this.handleCompanyNameClick = this.handleCompanyNameClick.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.state = {showCompanyList: false}
    this.state.selectedCompanies = []
    this.state.selectedCompaniesMetrics = {}
    this.state.selectedMetricGroup = 0
  }
  componentDidMount() {
    this.props.fetchCompanies(1) // TODO: hardcoded as Tech industry
  }

  handleSearch(query) {
    this.props.searchCompanies(query)
    query && query.length > 0 ? this.setState({showCompanyList:true}) : this.setState({showCompanyList: false})
  }

  handleCompanyNameClick(company) {
    this.props.history.push(`/industry/${company.industry.id}/company/${company.id}`)
  }
  handleCompanyClick(company) {
    if (company) {
      var companies = this.state.selectedCompanies
      var companiesMetrics = this.state.selectedCompaniesMetrics
      if (company.id in companiesMetrics) {
        return
      }
      companies.push(company)
      this.setState({selectedCompanies: companies, showCompanyList: false})

      APIUtilMetric.getMetrics(company.id)
        .then(response => {
          companiesMetrics[company.id] = response.data.metrics_dashboard
          this.setState({selectedCompaniesMetrics: companiesMetrics})
        })
    }
  }

  handleButtonClick(val) {
    this.setState({selectedMetricGroup: val})
  }

  render() {
    const classes = this.props.classes
    var showCompanyList = this.state.showCompanyList
    var selectedCompanies = this.state.selectedCompanies
    var selectedCompaniesMetrics = this.state.selectedCompaniesMetrics
    var selectedMetricGroup = this.state.selectedMetricGroup

    const metricGroupButtons = () => (
      <div className={classes.metricSelect}>
        <Button raised color={selectedMetricGroup == 0 && 'primary' || 'default'} className={classes.metricGroupButton} onClick={() => this.handleButtonClick(0)} disableRipple={true}>
          <Typography type="button" className={classes.metricGroupButtonText}>
            Overall
          </Typography>
        </Button>
        <Button raised color={selectedMetricGroup == 1 && 'primary' || 'default'} className={classes.metricGroupButton} onClick={() => this.handleButtonClick(1)} disableRipple={true}>
          <Typography type="button" className={classes.metricGroupButtonText}>
            Sales force productivity
          </Typography>
        </Button>
        <Button raised color={selectedMetricGroup == 2 && 'primary' || 'default'} className={classes.metricGroupButton} onClick={() => this.handleButtonClick(2)} disableRipple={true}>
          <Typography type="button" className={classes.metricGroupButtonText}>
            Sales process
          </Typography>
        </Button>
        <Button raised color={selectedMetricGroup == 3 && 'primary' || 'default'} className={classes.metricGroupButton} onClick={() => this.handleButtonClick(3)} disableRipple={true}>
          <Typography type="button" className={classes.metricGroupButtonText}>
            Organizational structure
          </Typography>
        </Button>
      </div>
    );

    return (
      <div className={classes.exploreContainer}>
        <div className={classes.explorePage}>
          <div className={classes.headerSection}>
            <h1 className={classes.headerTitle}>Explore sales metrics</h1>
            <h3>Understand sales performance metrics for any technology sector or company</h3>
          </div>
          <div className={classes.metricsTableSection}>
            <div className={classes.searchBar}>
              <SearchBar onSearch={this.handleSearch}/>
            </div>
            {metricGroupButtons()}
            {showCompanyList &&
              <div className={classes.companyTableView}>
                <CompanyTableView onClick={this.handleCompanyClick} companies={this.props.companies} />
              </div>
            }
            <MetricsTable companies={selectedCompanies} metrics={selectedCompaniesMetrics} selectedMetricGroup={selectedMetricGroup} onNameClick={this.handleCompanyNameClick}/>
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
