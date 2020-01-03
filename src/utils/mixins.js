import moment from 'moment'

export const timeFilter = {
  filters: {
    timeFormate(datetime) {
      return datetime ? moment(datetime).format('YYYY-MM-DD, HH:mm') : '-'
    }
  }
}

export const currencyFilter = {
  filters: {
    currency(num) {
      return 'NTD ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}