import React from 'react'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import ActionCardTravel from 'material-ui/svg-icons/action/card-travel'
import MapsMap from 'material-ui/svg-icons/maps/map'
import MapsDirectionsBus from 'material-ui/svg-icons/maps/directions-bus'
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car'

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
