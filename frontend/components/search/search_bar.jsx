import React, {Component} from 'react';

import {grey400} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

import './search_bar.css';


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch(e) {
    e.preventDefault()
    this.props.onSearch(this.refs.searchQuery.getValue())
  }

  render() {
    return (
      <div className="SearchBar">
        <Paper className="SearchBar__paper">
          <div className="SearchBar__search-field">
            <SearchIcon className="SearchBar__icon" color={grey400}/>
            <form onSubmit={this.onSearch}>
              <TextField
                ref="searchQuery"
                hintText="Company name"
                underlineShow={false}
                fullWidth={true} /><br />
            </form>
          </div>
        </Paper>
      </div>
    )
  }
}

export default SearchBar;