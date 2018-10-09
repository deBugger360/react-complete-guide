import React, { Component } from 'react';
import classes from './App.css';
import Person from './Components/Person';

class App extends Component {
  state = {
    persons: [
      {id: "aaqq", name: "John Jones", age: 500},
      {id: "aaeq", name: "Thanos", age: 300},
      {id: "agqq", name: "Steve Rogers", age: 75}
    ],
    showPersons: false
  }

  nameChangerHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;
    let btnClass = "";

    if (this.state.showPersons) {
      persons = (
        <div>
            {this.state.persons.map((person, index) => {
              return <Person 
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangerHandler(event, person.id)} />
            })}
        </div> 
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
    


    return (
        <div className={classes.App}>
          <h1>Hello, React</h1>
          <p className={assignedClasses.join(" ")}>This is so cool</p>
          <button 
          onClick={this.togglePersonsHandler} className={btnClass}>Toggle Persons</button>
          {persons}
        </div>
    );
  }
}

export default App;
