import axios from 'axios'
import React, {useState, useEffect} from 'react'


const Languages = ({languages}) => {
  const langs = Object.values(languages)
  
  return(
    <>
      <h2>Spoken Languages</h2>
      <ul>
        {langs.map(lang => <li key={langs.indexOf(lang)}>{lang}</li>)}
      </ul>
    </>
  )
}

const Flag = ({flag}) => {
  console.log(flag)
  return (
    <>
      <img src={flag} alt={'Flag'} style={{width: `150px` }}/>
    </>
  )
}

const Country = ({all, country}) => {
  //console.log(country[0])

  const val = country[0]
  const data = all.filter(obj => {
    return obj.name.common === val
  })[0]
  const flag = data.flags.png

  return (
    <>
      <h1>{country}</h1>
      <div>capital {data.capital}</div>
      <div>population {data.population}</div>
      <Languages languages={data.languages} />
      <Flag flag={flag} />
      <h2>Weather in {data.capital}</h2>
      <div>
        <b>temperature:</b> {5} Celcius
      </div>
      <img src="#" alt="Weather Icon"/>
      <div>
        <b>wind:</b> {'26 mph direction SSW'}
      </div>
    </>
  )
}

const Button = ({country, setFilter}) => {
  const nation = country
  const handleClick = (e)=> {
    setFilter(e.target.value)
  }
  return(
    <div>
      {nation} <button onClick={handleClick} value={nation}>show</button>
    </div>
  )
}


const Display = ({all, filter, setFilter}) => {
  const data = [...all]
  const results = data
                    .map(country => country.name.common)
                    .filter(common => common.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  return (
    <>
      <div>
        {results.length > 10
           ?"Too many matches, specify another filter"
           :results.length === 1
           ? <Country all={data} country={results}/>
           : results.map(result => <Button key={result} country={result} setFilter={setFilter} />)
        }
      </div>
    </>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [all, setAll] = useState([])
  const [latlng, setCord] = useState([])


  useEffect(()=> {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fufilled')
        setAll(response.data)
      })
  }, [])

  console.log('render', all.length, 'results')

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <>
    <div>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
    <Display all={all} filter={filter} setFilter={setFilter} />
    </>
  )
}

export default App;
