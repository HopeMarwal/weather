import { useEffect, useState } from "react";
//Components
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";
import HourlyForecast from "./components/HourlyForecast";
//Style
import './assets/style/style.scss'
//Bg
import { cloudyDay, clearNight, cloudyNight } from './assets/img/icons/weatherIcons'

const ipToken = 'a532296877f3d8'

function App() {
  const [unit, setUnit] = useState('C')
  const [currentZone, setCurrentZone] = useState(null)
  const [key, setKey] = useState(null)
  const [bgPhrase, setBgPhrase]= useState('empty')
  const [bgColor, setBgColor] = useState('#214d86')

 
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://ipinfo.io/json?token=${ipToken}`, {signal: signal})
      .then((res) => res.json())
      .then((res) => {
        setKey(res.loc)
        console.log(res)
        setCurrentZone({city: res.city, region: res.region})
      })
      .catch((err) => console.log(err));

    return () => {
      controller.abort()
    }
  }, [])


  useEffect(() => {
    const bg = () => {
      let color;
      if(cloudyDay.includes(bgPhrase)) {
        color = 'linear-gradient(rgb(36, 77, 114) 0%, rgb(7, 33, 59) 100%)'
      } else if(clearNight.includes(bgPhrase)) {
        color = 'linear-gradient(rgb(40, 69, 110) 0%, rgb(20, 36, 68) 100%)'
      } else if(cloudyNight.includes(bgPhrase)) {
        color = 'linear-gradient(rgb(45, 65, 86) 0%, rgb(26, 28, 36) 100%)'
      }
      if(color) {
        setBgColor(color)
      }
    }
    bg()
  }, [bgPhrase])

  
  return (
    <div className="App" style={{ background: `${bgColor}`}}>
      {/* Heading (search box, C or F) */}
      { currentZone && 
      <Heading
        setKey={setKey}
        unit={unit}
        setUnit={setUnit}
        currentZone={currentZone}
      />
      }
      {/* Main weather */}
      {key && <Main dataKey={key} setBgPhrase={setBgPhrase} setCurrentZone={setCurrentZone} /> }

      {/* Hourly weather forecast */}
      {key && <HourlyForecast dataKey={key} /> }

      {/*5 day Forecast */}
      {key && <Forecast dataKey={key} />}
    </div> 
  );
}

export default App;
