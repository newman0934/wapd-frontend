import { apiHelper } from '../utils/helpers'

export default {
  postTransition({ amt, sn }) {
    return apiHelper.post(`/admins/orders/transition`, { amt, sn })
  }
}