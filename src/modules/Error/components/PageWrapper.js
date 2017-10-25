import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Button from 'material-ui-next/Button'
import BgImgWrapper from '../../../components/BgImgWarpper/BgImgWrapper'

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

const PageWrapper = ({ classes, title, children, onGoHome }) => (
  <BgImgWrapper>
    <div className={classes.content}>
      <h1 className={classes.h1}>{title}</h1>
      <h2 className={classes.h2}>{children}</h2>
      <div className={classes.buttonWrapper}>
        <Button
          raised={true}
          color="primary"
          onClick={onGoHome}>
          Let's go home
        </Button>
      </div>
    </div>
  </BgImgWrapper>
)

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onGoHome: PropTypes.func.isRequired
}

export default withStyles(styles)(PageWrapper)
