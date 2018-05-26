import React from 'react'
import { compose, isEmpty } from 'ramda'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { pure, setDisplayName, componentFromStream, createEventHandler } from 'recompose'
import { addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'
import { CHECKBOX_PARAM } from './constant'
import NotFoundImage from './searchIcon.svg'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  progress: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 400,
    alignItems: 'center',
    background: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14),' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  },

  notFound: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    background: '#fff',
    height: 400,
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    '& img': {
      width: '25%',
      margin: '0 60px'
    },
    '& h4': {
      margin: '0 0 10px',
      fontSize: '1.5em',
      textAlign: 'center'
    }
  },
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  pure,
  setDisplayName('TableBody'),
)

const TableBody = componentFromStream(props$ => {
  const { stream: onCheckItem$, handler: onCheckItem } = createEventHandler()

  onCheckItem$
    .withLatestFrom(props$)
    .subscribe(([{ value, id }, { history }]) => {
      const search = history.location.search
      const param = value
        ? addItemToSelect(search, CHECKBOX_PARAM, id)
        : removeItemFromSelect(search, CHECKBOX_PARAM, id)

      addParamsRoute({ [CHECKBOX_PARAM]: param }, history)
    })

  return props$.combineLatest(props => {
    const { classes, withCheckbox, content } = props

    return (
      <div className={classes.root}>
        {props.loading && (
          <div className={classes.progress}>
            <CircularProgress size={75} color="secondary" />
          </div>
        )}

        {isEmpty(props.list) && (
          <div className={classes.notFound}>
            <img src={NotFoundImage} />
            <div>
              <h4>Ooops, Item Not Found</h4>
              <span>Try rewording your search or entering a new keyword</span>
            </div>
          </div>
        )}

        {!props.loading && props.children.map((item) =>
          React.cloneElement(item, {
            id: item.key,
            isBody: true,
            onCheckItem,
            withCheckbox,
            content: content && content.key === item.key ? content : null,
          })
        )}
      </div>
    )
  })
})

TableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.array,
  list: PropTypes.array,
  withCheckbox: PropTypes.bool,
  onCheckItem: PropTypes.func,
  content: PropTypes.node
}

export default enhance(TableBody)
