import React from "react";
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import PageTabs from "./PageTabs";
import GridView from "./GridView";
import AddTaskView from "./AddTaskView";
import ListView from "./ListView";
class App extends React.Component {
  state = {
    view: "grid-view",
    tasks: [],
    errorMessage: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://my-json-server.typicode.com/bnissen24/project2DB/posts")
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <PageTabs/>
          <div>
            <Route path="/" exact component={GridView} />
            <Route path="/list-items" component={ListView} />
            <Route path="/add-task" component={AddTaskView} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
