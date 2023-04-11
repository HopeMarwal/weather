import { useEffect, useState } from "react";
//Components
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";
import HourlyForecast from "./components/HourlyForecast";
//Style
import './assets/style/style.scss'
//Bg
import { clear } from './assets/img/icons/weatherIcons'

const ipToken = 'a532296877f3d8'

function App() {
  const [unit, setUnit] = useState('C')
  const [currentZone, setCurrentZone] = useState(null)
  const [key, setKey] = useState(null)
  const [bgPhrase, setBgPhrase]= useState('empty')
  const [bgColor, setBgColor] = useState('')

 
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://ipinfo.io/json?token=${ipToken}`, {signal: signal})
      .then((res) => res.json())
      .then((res) => {
        setKey(res.loc)
        setCurrentZone({city: res.city, region: res.region})
      })
      .catch((err) => console.log(err));

    return () => {
      controller.abort()
    }
  }, [])


  useEffect(() => {
    let clName = 'cloud_day'
    if(clear.includes(bgPhrase)) {
      clName = 'clear_day'
    }
    setBgColor(clName)
      
  }, [bgPhrase])

  
  return (
    <div className={`App ${bgColor}`}>
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
