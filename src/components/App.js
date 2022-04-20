import React from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import PageTabs from "./PageTabs";
import GridView from "./GridView";
import AddTaskView from "./AddTaskView";
import ListView from "./ListView";
class App extends React.Component {
  state = {
    view: "grid-view",
    tasks: [],
    sorted_tasks: {
      todo_tasks: [],
      inProgress_tasks: [],
      review_tasks: [],
      done_tasks: [],
    },
    errorMessage: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://my-json-server.typicode.com/bnissen24/project2DB/posts")
      .then((response) => {
        this.setState({
          tasks: response.data,
          sorted_tasks: this.sortTasks(response.data),
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  sortTasks(item) {
    return {
      todo_tasks: item.filter((post) => post.column === "todo"),
      inProgress_tasks: item.filter((post) => post.column === "in-progress"),
      review_tasks: item.filter((post) => post.column === "review"),
      done_tasks: item.filter((post) => post.column === "done"),
    };
  }

  updateItem(indiv_item) {
    let tasks = this.state.tasks;
    const current_position = tasks.findIndex(
      (item) => item.id === indiv_item.id
    );
    tasks[current_position] = indiv_item;

    const sorted_tasks = this.sortTasks(tasks);
    this.setState({ tasks, sorted_tasks });
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <PageTabs />
          <div>
            <Route
              path="/"
              exact
              component={() => (
                <GridView
                  tasks={this.state.sorted_tasks}
                  updateItem={(item) => this.updateItem(item)}
                  name="Johnny"
                />
              )}
            />
            <Route path="/list-items" component={ListView} />
            <Route path="/add-task" component={AddTaskView} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
