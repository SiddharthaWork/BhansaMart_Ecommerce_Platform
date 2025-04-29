import classNames from 'classnames'
import { FrontendRoutes } from '../Routes'
import { transactionList } from '../../mock/transaction-list'

export const transactionBasicSetup = () => {
  const transactionBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Transaction',
      path: '#',
    },
  ]



  return { transactionBreadcrumbData }
}
