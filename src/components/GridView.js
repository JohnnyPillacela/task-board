import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
// import Collapse from "react-bootstrap/Collapse";
// import Button from "react-bootstrap/Button";
// import Collapse from "@mui/material/Collapse";

import GridItem from "./GridItem";
import "../styles/GridView.css";

const columns = ["todo", "in-progress", "review", "done"];

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
  }

  findItem(id, column_name) {
    if (column_name === "todo") {
      return this.props.tasks.todo_tasks.find((item) => item.id === id);
    }
    if (column_name === "in-progress") {
      return this.props.tasks.inProgress_tasks.find((item) => item.id === id);
    }
    if (column_name === "review") {
      return this.props.tasks.review_tasks.find((item) => item.id === id);
    } else {
      return this.props.tasks.done_tasks.find((item) => item.id === id);
    }
  }

  back(id, column_name) {
    let item = this.findItem(id, column_name);
    let position = columns.findIndex((pos) => item.column === pos);
    if (position > 0) {
      position -= 1;
      item.column = columns[position];
      this.props.updateItem(item);
    }
  }

  next(id, column_name) {
    let itemId = this.findItem(id, column_name);
    let position = columns.findIndex((pos) => itemId.column === pos);

    if (position < columns.length) {
      position += 1;
      itemId.column = columns[position];
      this.props.updateItem(itemId);
    }
  }

  moveItem(post, previous, forward, id) {
    return (
      <GridItem
        id={post.id}
        key={post.id}
        title={post.title}
        type={post.type}
        column={post.column}
        previous={previous}
        back={this.back}
        forward={forward}
        next={this.next}
      />
    );
  }

  render() {
    const todo_list = this.props.tasks.todo_tasks.map((post) =>
      this.moveItem(post, "", "In Progress ")
    );
    const inProgress_list = this.props.tasks.inProgress_tasks.map((post) =>
      this.moveItem(post, " Send back ", "Request Review ")
    );
    const review_list = this.props.tasks.review_tasks.map((post) =>
      this.moveItem(post, " Back to Progress", "Done ")
    );
    const done_list = this.props.tasks.done_tasks.map((post) =>
      this.moveItem(post, " Review Again", "")
    );

    return (
      <div className="container grid-view-cont">
        <h3>Task Board</h3>
        <hr className="hr" />
        <div className="row gridView">
          <div className="col-3 col-cont todo">
            <h3>To-Do</h3>
            <div className="item-container" id="todo">
              {todo_list}
            </div>
          </div>
          <div className="col-3 col-cont inProgress">
            <h3 className="title">In Progress</h3>
            <div className="item-container">{inProgress_list}</div>
          </div>
          <div className="col-3 col-cont review">
            <h3 className="title">Under Review</h3>
            <div className="item-container">{review_list}</div>
          </div>
          <div className="col-3 col-cont done">
            <h3 className="title">Done</h3>
            <div className="item-container">{done_list}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GridView;
