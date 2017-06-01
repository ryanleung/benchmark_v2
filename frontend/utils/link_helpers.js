import React from 'react'
import { Link } from 'react-router-dom'

export const getCompanyPageLink = company => {
  const link = `/industry/${company.industry.id}/company/${company.id}`
  return (
    <Link to={link}>{company.name}</Link>
  )
}