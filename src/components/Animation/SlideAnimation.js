import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withStyles from 'material-ui-next/styles/withStyles'
import { slideInDown, slideOutUp } from 'react-animations'

const styles = {
  '@keyframes slideInDown': slideInDown,
  slideInDown: {
    opacity: 0.01,
    animationName: 'slideInDown',
    animationDuration: '1s',
  },
  '@keyframes slideOutUp': slideOutUp,
  slideOutUp: {
    animationName: 'slideOutUp',
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

const SlideAnimation = ({ classes, open, children, ...props }) => (
  <TransitionGroup>
    {open && <CSSTransition timeout={1000} {...props} classNames={{
      enter: classes.slideInDown,
      enterActive: classes.enterActive,
      exit: classes.slideOutUp,
      exitActive: classes.exitActive,
    }}>
      {children}
    </CSSTransition>}
  </TransitionGroup>
)

SlideAnimation.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(SlideAnimation)
