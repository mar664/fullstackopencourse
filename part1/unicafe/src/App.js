import { useState } from 'react'
const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, bad, neutral}) => {
    if (good + neutral + bad > 0){
        return (
            <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value ={good} />
                    <StatisticLine text="neutral" value ={neutral} />
                    <StatisticLine text="bad" value ={bad} />
                    <StatisticLine text="all" value ={good + neutral + bad} />
                    <StatisticLine text="average" value ={(good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)} />
                    <StatisticLine text="positive" value ={100 * good / (good + neutral + bad) + "%"} />
                </tbody>
            </table>
        </>
        )
    } else {
        return <p>No feedback given</p>
    }
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
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
        <Button handleClick={() => setGood(good + 1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      </div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App