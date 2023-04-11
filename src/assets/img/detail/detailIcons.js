import moonCircle from './moonCircle.svg'
import moonrise from './moonrise.svg'
import moonset from './moonset.svg'
import sunCircle from './sunCircle.svg'
import sunrise from './sunrise.svg'
import sunset from './sunset.svg'
import firstQuarter from './firstQuarter.ico'
import fullMoon from './fullMoon.ico'
import newMoon from './newMoon.ico'
import thirdQuarter from './thirdQuarter.ico'
import wanningCrescent from './wanningCrescent.ico'
import wanningGibbous from './wanningGibbous.ico'
import waxingCrescent from './waxingCrescent.ico'
import waxingGibbous from './waxingGibbous.ico'




export const icons = {
  moonCircle: moonCircle,
  moonrise: moonrise,
  moonset: moonset,
  sunCircle: sunCircle,
  sunrise:sunrise,
  sunset:sunset
}

export const moonPhase = [
  {
    title: 'First',
    value: firstQuarter
  },
  {
    title: 'Full Moon',
    value: fullMoon,
  },
  {
    title: 'New Moon',
    value: newMoon,
  },
  {
    title: 'Last',
    value: thirdQuarter,
  },
  {
    title: 'Waning Crescent',
    value: wanningCrescent,
  },
  {
    title: 'Waning Gibbous',
    value: wanningGibbous,
  },
  {
    title: 'Waxing Crescent',
    value: waxingCrescent,
  },
  {
    title: 'Waxing Gibbous',
    value: waxingGibbous,
  }
]