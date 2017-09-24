import React, {Component, PropTypes} from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { Link } from 'react-router-dom'

import Company from '../../models/Company'
import { getCompanyPageLink } from '../../utils/link_helpers'

import './company_grid_view.css'


const CompanyCard = ({ company }) => (
  <Link className="CompanyCard"
        to={`/industry/${company.industry.id}/company/${company.id}`}>
    <Avatar src={company.logo_img_url} size={72}/>
    <h2>{company.name}</h2>
    <div>{`${company.city} / ${company.state}`}</div>
  </Link>
);

CompanyCard.propTypes = {
  company: PropTypes.instanceOf(Company)
}

//<h2>{getCompanyPageLink(company)}</h2>
export default CompanyCard;
