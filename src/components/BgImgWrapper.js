import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import getImgBg from '../helpers/getImgBg'

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#eef5f9',
    color: '#607188',

    '&:after': {
      backgroundColor: 'rgba(47,25,217,.4)',
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      bottom: '0',
      right: '0',
      left: '0',
      zIndex: '1'
    }
  }
}

const BgImgWrapper = ({ classes, img, children }) => (
  <div className={classes.wrapper} style={{ backgroundImage: `url(${img})` }}>
    {children}
  </div>
)

BgImgWrapper.defaultProps = {
  img: getImgBg()
}

BgImgWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  img: PropTypes.string
}

export default injectSheet(styles)(BgImgWrapper)
