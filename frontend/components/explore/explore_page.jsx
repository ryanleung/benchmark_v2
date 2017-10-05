import React, {Component} from 'react';

import * as APIUtil from '../../api/company_api_util'
import CompanyGridView from '../company/company_grid_view'
import SearchBar from '../search/search_bar'

import './explore.css';


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
    return (
      <div className="ExplorePage">
        <h1>Explore Benchmarks</h1>
        <div>Understand sales and marketing performance drivers for top companies</div>
        <div className="ExplorePage__search">
          <SearchBar onSearch={this.handleSearch}/>
        </div>
        <h2>Companies</h2>
        <CompanyGridView companies={this.props.companies} />
      </div>
    )
  }
}

export default ExplorePage;
