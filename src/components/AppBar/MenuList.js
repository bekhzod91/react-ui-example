import React from 'react'
import _ from 'lodash'
import { ListItem } from 'material-ui/List'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import ActionCardTravel from 'material-ui/svg-icons/action/card-travel'
import MapsMap from 'material-ui/svg-icons/maps/map'
import MapsDirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car'

export const renderMenuList = (item, index) => {
  const title = _.get(item, 'title')
  const icon = _.get(item, 'icon')
  const children = _.get(item, 'children')

  if (!_.isEmpty(children)) {
    const style = index === 1 ? { borderLeft: '3px solid #2196f3', background: '#eaf3f8' } : {}
    return (
      <ListItem
        style={style}
        innerDivStyle={index === 1 ? { background: '#eaf3f8' } : {}}
        nestedListStyle={style}
        hoverColor={'#eaf3f8'}
        key={index}
        primaryText={title}
        leftIcon={icon}
        primaryTogglesNestedList={true}
        nestedItems={_.map(children, renderMenuList)}
      />
    )
  }

  return (
    <ListItem
      key={index}
      hoverColor={'#eaf3f8'}
      primaryText={title}
      leftIcon={icon}
    />
  )
}

export default [
  {
    name: 'dashboard',
    url: '/dashboard',
    title: 'Dashboard',
    icon: (<ActionDashboard />)
  },
  {
    name: 'cards',
    title: 'Cards',
    icon: (<ActionCardGiftcard />),
    children: [
      {
        name: 'cards-template',
        url: '/card-template',
        title: 'Card Template',
        icon: (<ActionCardTravel />)
      },
      {
        name: 'cards-travel',
        url: '/card-travel',
        title: 'Card Travel',
        icon: (<ActionCardTravel />)
      }
    ]
  },
  {
    name: 'app-views',
    title: 'App views',
    icon: (<MapsMap />),
    children: [
      {
        name: 'bus',
        url: '/app-views/bus',
        title: 'Directions Bus',
        icon: (<MapsDirectionsBus />)
      },
      {
        name: 'bus',
        url: '/app-views/car',
        title: 'Directions Card',
        icon: (<MapsDirectionsCar />)
      }
    ]
  }
]
