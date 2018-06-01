import { path } from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import { withRouter } from 'react-router'
import { compose, pure, componentFromStream, createEventHandler } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InfoIcon from '@material-ui/icons/Info'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import { getCurrentTabIndex } from '../../../helpers/get'
import * as ROUTES from '../../../constants/routes'
import { redirect } from '../../../helpers/route'

const tabs = ['info', 'edit']

const styles = theme => ({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12
  },
  labelIcon: {
    height: 48,
    '& > span': {
      flexDirection: 'row',
      '& span': {
        fontSize: '1.1rem'
      }
    },
  },
  icon: {
    color: '#fff'
  }
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  pure
)

const CompanyDetail = componentFromStream(props$ => {
  const { stream: onChangeTab$, handler: onChangeTab } = createEventHandler()

  onChangeTab$
    .withLatestFrom(props$)
    .subscribe(([tabIndex, { history, ...props }]) => {
      const id = path(['item', 'data', 'id'], props)
      const search = history.location.search
      const pathname = sprintf(ROUTES.COMPANY_DETAIL_TAB_URL, id, tabs[tabIndex]) + search

      redirect({ pathname }, history)
    })

  return props$.combineLatest(({ classes, ...props }) => {
    const data = path(['item', 'data'], props)
    const currentTabIndex = getCurrentTabIndex(tabs, props.match)

    return (
      <div>
        <AppBar position="static" classes={{ root: classes.appBar }}>
          <Tabs
            className={classes.tabs}
            value={currentTabIndex}
            onChange={(event, tabIndex) => onChangeTab(tabIndex)}>
            <Tab
              classes={{ labelIcon: classes.labelIcon }}
              label="Info"
              icon={<InfoIcon />} />
            <Tab
              classes={{ labelIcon: classes.labelIcon }}
              label="Edit"
              icon={<EditIcon />} />
          </Tabs>
        </AppBar>
        <div>
          {currentTabIndex === 0 && (<div>
            {data.name}
          </div>)}
          {currentTabIndex === 1 && (<div>
            {data.name} 1
          </div>)}
        </div>
      </div>
    )
  })
})

CompanyDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,
}

export default enhance(CompanyDetail)
