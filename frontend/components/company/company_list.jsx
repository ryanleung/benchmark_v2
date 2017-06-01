import React, { Component, PropTypes } from 'react';

import Company from '../../models/Company'
import CompanyListRow from './company_list_row'


const CompanyList = ({ companies }) => (
  <div>
    {companies.map(company =>
      <CompanyListRow key={company.id}
                      company={company}/>
    )}
  </div>
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(Company)
}

export default CompanyList;