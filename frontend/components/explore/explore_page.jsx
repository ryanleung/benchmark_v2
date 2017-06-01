import React, {Component} from 'react';

import CompanyList from '../company/company_list'
import SearchBar from '../search/search_bar'

import './explore.css';


class ExplorePage extends Component {
  componentDidMount() {
    this.props.fetchCompanies(1) // TODO: hardcoded as Tech industry
  }

  render() {
    return (
      <div className="ExplorePage">
        <h1>Explore Benchmarks</h1>
        <div>Understand sales and marketing performance drivers for top companies</div>
        <div className="ExplorePage__search">
          <SearchBar />
        </div>
        <h2>Companies</h2>
        <div className="ExplorePage__company-list">
          <CompanyList companies={this.props.companies} />
        </div>
      </div>
    )
  }
}

export default ExplorePage;