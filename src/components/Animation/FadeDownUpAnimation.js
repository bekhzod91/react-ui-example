import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withStyles from 'material-ui/styles/withStyles'
import { fadeInDown, fadeOutUp } from 'react-animations'

const styles = {
  '@keyframes fadeInDown': fadeInDown,
  fadeInDown: {
    animationName: 'fadeInDown',
    animationDuration: '1s',
  },
  '@keyframes fadeOutUp': fadeOutUp,
  fadeOutUp: {
    animationName: 'fadeOutUp',
    animationDuration: '1s',
  }
}

const SlideAnimation = ({ classes, open, children, ...props }) => (
  <TransitionGroup>
    {open && <CSSTransition timeout={1000} {...props} classNames={{
      enter: classes.fadeInDown,
      exit: classes.fadeOutUp
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
