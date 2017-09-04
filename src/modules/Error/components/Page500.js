import React from 'react'
import PageWrapper from './PageWrapper'

const Page500 = () => (
  <PageWrapper title="500">
    <span style={{ fontSize: '2em' }}>Whoops!</span>
    <br />
    Something went wrong on our end,
    <br />
    we've alerted our engineers to see what happened.
  </PageWrapper>
)

export default Page500
