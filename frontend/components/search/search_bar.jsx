import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';

import {grey400} from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';

import './search_bar.css';

const styles = theme => ({
  input: {
    display: 'block',
    verticalAlign: 'middle',
    lineHeight: theme.spacing.unit / 3,
    whiteSpace: 'normal',
    background: 'none',
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.value)
  }

  render() {
    const classes = this.props.classes
    return (
      <div className="SearchBar">
        <Paper className="SearchBar__paper">
          <div className="SearchBar__search-field">
            <SearchIcon className="SearchBar__icon" color={grey400}/>
            <form onSubmit={this.handleSubmit}>
              <TextField
                className={classes.input}
                placeholder={"Company Name"}
                InputProps={{disableUnderline: true}}
                onChange={this.handleSearch}
                value={this.state.value}/>
            </form>
          </div>
        </Paper>
      </div>
    )
  }
}
SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SearchBar);
