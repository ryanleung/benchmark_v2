import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import Company from '../../models/Company'

import './company_page.css'


class CompanyPage extends Component {
  componentDidMount() {
    const { match } = this.props
    this.props.fetchCompany(match.params.company_id)
  }

  render() {
    const { company } = this.props

    return (
      <div>
        {company && 
          <div className="CompanyPage">
            <h1>{company.name}</h1>
            <h2>Company Overview</h2>
          </div>
        }
      </div>
    )
  }
}

CompanyPage.propTypes = {
  company: PropTypes.instanceOf(Company),
}

export default CompanyPage;