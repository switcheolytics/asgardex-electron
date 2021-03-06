// German
// Antd Internationalization https://2x.ant.design/docs/react/i18n
import antdData from 'antd/lib/locale-provider/de_DE'

import { Messages } from '../types'
import bonds from './bonds'
import common from './common'
import deposit from './deposit'
import ledger from './ledger'
import midgard from './midgard'
import pools from './pools'
import poolShares from './poolshares'
import routes from './routes'
import settings from './settings'
import swap from './swap'
import wallet from './wallet'

export default {
  ...antdData,
  ...common,
  ...pools,
  ...routes,
  ...wallet,
  ...settings,
  ...swap,
  ...deposit,
  ...midgard,
  ...ledger,
  ...bonds,
  ...poolShares
} as Messages
