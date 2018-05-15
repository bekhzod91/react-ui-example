import { map, addIndex } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ArrowUpward from 'material-ui-icons/ArrowUpward'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

const styles = theme => ({
  card: {
  },
  cardTop: {
    backgroundColor: theme.palette.primary[500],
    position: 'relative',
    '& span': {
      color: theme.widget.whiteText
    }
  },
  subheader: {
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  more: {
    position: 'absolute',
    top: 10,
    right: 5,
    '& svg': {
      color: `${theme.widget.whiteText} !important`
    }
  },
  expand: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  chartInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& span:first-child': {
      fontSize: '38px',
      lineHeight: 0.8
    },
    '& svg': {
      verticalAlign: 'bottom',
      color: `${theme.widget.whiteText} !important`,
      marginRight: 5
    }
  },
  tabs: {
    '& button': {
      minWidth: 'inherit',
      textTransform: 'uppercase',
      flex: 1
    }
  },
  tabItem: {
    padding: '20px 10px',
    fontSize: 10,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    color: theme.palette.secondary[400]
  }
})

class Widget extends React.Component {
  state = {
    value: 0,
    expanded: false
  }

  handleChange = (event, value) => {
    const { onChangeTab } = this.props
    onChangeTab(value)
    this.setState({ value })
  }

  render () {
    const { classes, actions, widgetInfo, children, tabs, loading } = this.props
    const { title, subtitle, testNumber, bouncingNumber } = widgetInfo
    const { value } = this.state

    return (
      <Card className={classes.card}>
        <div className={classes.cardTop}>
          <CardHeader
            className={classes.cardHeader}
            classes={{ subheader: classes.subheader }}
            title={title}
            subheader={subtitle} />
          <div className={classes.more}>
            {actions}
          </div>
          <CardContent className={classes.chartInfo}>
            <span>{testNumber}</span>
            <span>
              <ArrowUpward />
              {bouncingNumber}
            </span>
          </CardContent>
        </div>
        <div className={classes.tabs}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              {addIndex(map)((item, index) => <Tab key={index} label={item} />, tabs)}
            </Tabs>
          </AppBar>
          <div className={classes.tabItem}>
            {loading ? <CircularProgress size={50} className={classes.loading} /> : children }
          </div>
        </div>
      </Card>
    )
  }
}

Widget.defaultProps = {
  tabs: [ 'day', 'week', 'month' ]
}

Widget.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  actions: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  tabs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  widgetInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    testNumber: PropTypes.number.isRequired,
    bouncingNumber: PropTypes.string.isRequired
  })
}

export default withStyles(styles)(Widget)
