import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/LinearProgress'
import Logo from './Logo'
import BgImgWrapper from './BgImgWrapper'

export const styles = {
  content: {
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 5px 12px rgba(0,0,0,.2)',
    transition: 'all,.2s,ease-in-out',
    position: 'relative',
    width: 375,
    padding: '0 30px 30px',
    boxSizing: 'border-box',
    margin: 'auto',
    zIndex: 2
  },

  loader: {
    position: 'absolute',
    width: '100%',
    right: 0,
    opacity: props => props.loading ? 1 : 0,
    transition: 'opacity 0.5s ease-out'
  },

  loaderContent: {
    position: 'absolute',
    right: '0',
    left: '0',
    top: '4px',
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: '999',
    visibility: props => props.loading ? 'visible' : 'hidden',
    opacity: '0.7',
    animation: 'fade 0.5s easy-in-out'
  },

  '@keyframes fade': {
    from: { opacity: 0 },
    to: { opacity: 0.7 },

  },

  title: {
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '10px auto',
    textTransform: 'uppercase'
  },

  page: {
    height: '100%'
  },

  footer: {
    padding: 15,
    '& p': {
      textAlign: 'justify',
      '&:after': {
        content: '""',
        display: 'inline-block',
        width: '100%'
      }
    }
  }
}

export const AuthLayout = ({ classes, title, loading, children }) => (
  <BgImgWrapper>
    <div className={classes.content}>
      <div className={classes.loaderContent} />
      <div className={classes.loader}>
        {loading && <LinearProgress mode="indeterminate" style={{ borderRadius: 0 }} />}
      </div>

      <Logo />

      <h1 className={classes.title}>{title}</h1>

      {children}
    </div>
  </BgImgWrapper>
)

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default injectSheet(styles)(AuthLayout)
