import React from 'react'
import PropTypes from 'prop-types'
import { compose, defaultProps } from 'recompose'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withStyles from '@material-ui/core/styles/withStyles'
import { fadeIn, fadeOut } from 'react-animations'

const styles = {
  '@keyframes fadeOut': fadeOut,
  fadeOut: {
    opacity: 0.01,
    animationName: 'fadeOut',
    animationDuration: '0.5s',
  },
  '@keyframes fadeIn': fadeIn,
  fadeIn: {
    animationName: 'fadeIn',
    animationDuration: '0.5s',
  },

  enterActive: {
    opacity: 1,
    transition: 'opacity 0.5s ease-out'
  },

  exitActive: {
    opacity: 0.01,
    transition: 'opacity 0.5s ease-in'
  }
}

const Fade = ({ classes, open, children, ...props }) => (
  <TransitionGroup>
    {open && <CSSTransition timeout={500} {...props} classNames={{
      enter: classes.fadeIn,
      enterActive: classes.enterActive,
      exit: classes.fadeOut,
      exitActive: classes.exitActive,
    }}>
      {children}
    </CSSTransition>}
  </TransitionGroup>
)

Fade.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default compose(
  defaultProps(),
  withStyles(styles)
)(Fade)
