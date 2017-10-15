import React, {Component, PropTypes} from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { Link } from 'react-router-dom'

import Company from '../../models/Company'
import { getCompanyPageLink } from '../../utils/link_helpers'

import './company_grid_view.css'


class CompanyCard extends Component {
  render() {
    const company = this.props.company

    if (company.id) {
      return (
        <Link className="CompanyCard"
          to={`/industry/${company.industry.id}/company/${company.id}`}>
          <Avatar src={company.logo_img_url} sizes={72}/>
          <h2>{company.name}</h2>
          <div>{`${company.city} / ${company.state}`}</div>
        </Link>
      ) 
    } else {
      return (
        <div className="CompanyCard">
          <Avatar src={company.logo_img_url} sizes={72}/>
          <h2>{company.name}</h2>
        </div>
      )
    }
  }
}

CompanyCard.propTypes = {
  company: PropTypes.instanceOf(Company)
}

//<h2>{getCompanyPageLink(company)}</h2>
export default CompanyCard;
