const Header = (props) => {
    return <h1>{props.course}</h1>
}
  
const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return (
        parts.map(p => <Part part={p.name} exercises={p.exercises} key={p.name}/>)
    )
}

const Total = ({parts}) => {
    return (
        <b>total of {parts.reduce((n, {exercises}) => n + exercises, 0)} exercises</b>
    )
}
const Course = ({course}) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course