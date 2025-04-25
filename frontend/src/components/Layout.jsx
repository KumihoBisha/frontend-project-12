import React from 'react'
import PageContainer from './PageContainer'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <PageContainer>
    <Navbar />
    {children}
  </PageContainer>
)

export default Layout
