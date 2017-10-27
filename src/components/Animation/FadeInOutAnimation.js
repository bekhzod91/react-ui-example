import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withStyles from 'material-ui-next/styles/withStyles'
import { fadeIn, fadeOut } from 'react-animations'

const styles = {
  '@keyframes fadeOut': fadeOut,
  fadeOut: {
    opacity: 0.01,
    animationName: 'fadeOut',
    animationDuration: '1s',
  },
  '@keyframes fadeIn': fadeIn,
  fadeIn: {
    animationName: 'fadeIn',
    animationDuration: '1s',
  },

  enterActive: {
    opacity: 1,
    transition: 'opacity 1000ms ease-out'
  },

  exitActive: {
    opacity: 0.01,
    transition: 'opacity 1000ms ease-in'
  }
}

const FadeAnimation = ({ classes, open, children, ...props }) => (
  <TransitionGroup>
    {open && <CSSTransition timeout={1000} {...props} classNames={{
      enter: classes.fadeIn,
      enterActive: classes.enterActive,
      exit: classes.fadeOut,
      exitActive: classes.exitActive,
    }}>
      {children}
    </CSSTransition>}
  </TransitionGroup>
)

FadeAnimation.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(FadeAnimation)
