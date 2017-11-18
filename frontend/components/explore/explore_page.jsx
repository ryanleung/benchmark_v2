import React, {Component} from 'react';

import * as APIUtil from '../../api/company_api_util'
import CompanyTableView from '../company/company_table_view'
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
        <div className="ExplorePage__search">
          <SearchBar onSearch={this.handleSearch}/>
        </div>
        <CompanyTableView companies={this.props.companies} />
      </div>
    )
  }
}

export default ExplorePage;
