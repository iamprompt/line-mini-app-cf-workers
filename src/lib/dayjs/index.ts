import 'dayjs/locale/th'

import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(buddhistEra)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs
