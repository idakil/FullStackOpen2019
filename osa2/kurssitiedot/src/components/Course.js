import React from 'react'

const Header = (props) => {
    return (
      <h1>
        {props.name}
      </h1>
    );
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    const partsMap = props.parts.map((part)=>
      <Part key={part.name} part={part.name} exercises = {part.exercises} />
    )
    return (
      <div>
        {partsMap}
      </div>
    )
  }
  
  const Total = (props) => {
    let courseArray = props.course;
    const reducer = (s, p) => {
      return s += p.exercises;
    }
    return (
      <strong>total of {courseArray.reduce(reducer, 0)} exercises</strong>
    )
  }

  const Course = (props) => {
    const courseInfo = () =>  props.course.map(p =>
        <div key={p.name}>      
            <Header name = {p.name}/>
            <Content  parts={p.parts}/>
            <Total course={p.parts} />
        </div>
      )

    return (
      <div>
          {courseInfo()}
      </div>
    )
  }
  export default Course
  