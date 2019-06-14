import React from "react";
import axios from 'axios';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.item.done
    };
  }

  toggleDone = () => {
    axios
      .put(`http://localhost:4000/todos/todo/${this.props.item._id}`, { title: this.props.item.title,
      done: !this.state.done } )
      .then(
        this.setState({
          done: !this.state.done
        })
      )
      .catch(error => console.log("toggleDone error :" + error));
  };

  render() {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          onClick={this.toggleDone}
          defaultChecked={this.state.done}
        />
        <p className={this.state.done ? "done" : null}>
          {this.props.item.title}
        </p>
        <button onClick={() => this.props.deleteItem(this.props.item._id)}>
          X
        </button>
      </div>
    );
  }
}

export default TodoItem;