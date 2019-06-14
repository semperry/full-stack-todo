import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TodoItem from "./todo-item";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos")
      .then(response => response.data)
      .then(data =>
        this.setState({
          todos: data
        })
      );
  }

  onChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  renderTodos = () => {
    return this.state.todos.map(item => {
      return (
        <TodoItem key={item._id} item={item} deleteItem={this.deleteItem} />
      );
    });
  };

  addTodo = event => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/todos/add-todo", {
        title: this.state.todo,
        done: false
      })
      .then(data => {
        this.setState({
          todos: [...this.state.todos, data.data],
          todo: ""
        });
      })
      .catch(error => console.log("addTodo error: " + error));
  };

  deleteItem = id => {
    axios
      .delete(`http://localhost:4000/todos/delete/${id}`)
      .then(
        this.setState({
          todos: this.state.todos.filter(item => {
            return item._id !== id;
          })
        })
      )
      .catch(error => console.log("deletItem error: " + error));
  };

  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add ToDo"
            onChange={this.onChange}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
