import React, { Component } from "react";

import "./blog.css";
import withRouter from "./withRouter";

class blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      image: null,
      date: "",
      time: "",
    };
  }
  
  componentDidMount() {
    fetch(`http://44.216.18.228:3001/blogs/${this.props.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data[0].title,
          text: data[0].text,
          image: data[0].image,
          date: data[0].date,
          time: data[0].time,
        });
      });
  }

  render() {
    return (
      <div>
        <div class="container">
          <div class="page">
            <div class="">
              <h1>{this.state.title}</h1>
              <div class="date">{this.state.date}</div>

              <img className="blImg" src={this.state.image} alt="" />

              <p>{this.state.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(blog);
