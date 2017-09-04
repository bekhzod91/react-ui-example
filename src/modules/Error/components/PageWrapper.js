import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import * as ROUTE from '../../../constants/routes'
import BgImgWrapper from '../../../components/BgImgWrapper'

const styles = {
  content: {
    overflow: 'hidden',
    transition: 'all,.2s,ease-in-out',
    position: 'relative',
    maxWidth: '500px',
    padding: '0 30px 30px',
    boxSizing: 'border-box',
    margin: 'auto',
    zIndex: '2',
  },

  h1: {
    fontSize: '15em',
    textAlign: 'center',
    color: 'rgba(255,255,255,.5)',
    margin: '10px 0'
  },
  h2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '2em',
    lineHeight: '1.5em'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const PageWrapper = ({ classes, title, children }) => (
  <BgImgWrapper>
    <div className={classes.content}>
      <h1 className={classes.h1}>{title}</h1>
      <h2 className={classes.h2}>{children}</h2>
      <div className={classes.buttonWrapper}>
        <RaisedButton
          label="Let's go home"
          primary={true}
          onTouchTap={() => browserHistory.push(ROUTE.COMPANY_MY_LIST_URL)} />
      </div>
    </div>
  </BgImgWrapper>
)

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PageWrapper)
