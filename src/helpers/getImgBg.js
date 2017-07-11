import _ from 'lodash'
import moment from 'moment'

export const getImageBySeason = () => {
  const imgName = _.lowerCase(moment().format('MMMM'))
  return require(`../components/assets/season/${imgName}.jpg`)
}

export default getImageBySeason
