import React, {Component, PropTypes} from 'react'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

import Company from '../../models/Company'
import { getCompanyPageLink } from '../../utils/link_helpers'


const CompanyListRow = ({ company }) => (
  <div>
    <Card>
      <CardHeader title={getCompanyPageLink(company)}
                  subtitle={`${company.city} / ${company.state}`}
                  avatar={company.logo_img_url} />
    </Card>
  </div>
);

CompanyListRow.propTypes = {
  company: PropTypes.instanceOf(Company)
}

export default CompanyListRow;