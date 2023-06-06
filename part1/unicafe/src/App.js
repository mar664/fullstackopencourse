import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => {
    return (
        <>
        <h1>statistics</h1>
        <div>
            good {good} <br/>
            neutral {neutral} <br/>
            bad {bad} <br/>
            all {good + neutral + bad} <br/>
            average {(good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)} <br/>
            positive {100 * good / (good + neutral + bad)} % <br/>
        </div>
    </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App