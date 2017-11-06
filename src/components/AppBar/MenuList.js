import React from 'react'
import DashboardIcon from 'material-ui-icons/Dashboard'
import CardGiftcardIcon from 'material-ui-icons/CardGiftcard'
import CardTravelIcon from 'material-ui-icons/CardTravel'
import MapIcon from 'material-ui-icons/Map'
import DirectionsBusIcon from 'material-ui-icons/DirectionsBus'
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar'

export default [
  {
    name: 'dashboard',
    url: '/dashboard',
    title: 'Dashboard',
    icon: (<DashboardIcon />)
  },
  {
    name: 'cards',
    title: 'Cards',
    icon: (<CardGiftcardIcon />),
    children: [
      {
        name: 'cards-template',
        url: '/card-template',
        title: 'Card Template',
        icon: (<CardTravelIcon />)
      },
      {
        name: 'cards-travel',
        url: '/card-travel',
        title: 'Card Travel',
        icon: (<MapIcon />)
      }
    ]
  },
  {
    name: 'app-views',
    title: 'App views',
    icon: (<MapIcon />),
    children: [
      {
        name: 'bus',
        url: '/app-views/bus',
        title: 'Directions Bus',
        icon: (<DirectionsBusIcon />)
      },
      {
        name: 'bus1',
        url: '/app-views/car',
        title: 'Directions Card',
        icon: (<DirectionsCarIcon />)
      }
    ]
  }
]
