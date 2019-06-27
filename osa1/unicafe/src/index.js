import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = (props) => (
    <tr>
        <td>{props.text} {props.value}</td>
    </tr>
)

const Statistics = (props) => {
    if (props.value === 0) {
        return (
            <div>no statistics</div>
        )
    } else {
        return (
            <div>
                <h1> statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={props.good} />
                        <Statistic text="neutral" value={props.neutral} />
                        <Statistic text="bad" value={props.bad} />
                        <Statistic text="all" value={props.all} />
                        <Statistic text="average" value={props.average} />
                        <Statistic text="positive" value={props.positive + " %"} />
                    </tbody>
                </table>
            </div>

        )
    }
}



const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.name}
    </button>
)


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const [all, setAll] = useState(0)
    const [sum, setSum] = useState(0)

    const handleGood = () => {
        setGood(good + 1);
        setAll(all + 1);
        setSum(sum + 1);
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1);
        setAll(all + 1);
    }
    const handleBad = () => {
        setBad(bad + 1);
        setAll(all + 1);
        setSum(sum - 1);
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => handleGood()} name="good" />
            <Button handleClick={() => handleNeutral()} name="neutral" />
            <Button handleClick={() => handleBad()} name="bad" />

            <Statistics good={good}
                        neutral={neutral}
                        bad={bad}
                        all={all}
                        average={sum/all}
                        positive={good/all*100}
            />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
