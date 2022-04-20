import React from "react";
import axios from 'axios';
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
}

export default App;
