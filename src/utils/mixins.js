import moment from 'moment'

export const timeFilter = {
  filters: {
    timeFormate(datetime) {
      return datetime ? moment(datetime).format('YYYY-MM-D, HH:mm') : '-'
    }
  }
}