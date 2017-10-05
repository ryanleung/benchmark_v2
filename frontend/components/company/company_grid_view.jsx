import React, { Component, PropTypes } from 'react'

import Company from '../../models/Company'
import CompanyCard from './company_card'

import './company_grid_view.css'


const CompanyGridView = ({ companies }) => (
  <div className="CompanyGridView">
    {companies.map(company =>
      <CompanyCard key={company.id}
                   company={company}/>
    )}
  </div>
);

CompanyGridView.propTypes = {
  companies: PropTypes.arrayOf(Company)
}

export default CompanyGridView;
