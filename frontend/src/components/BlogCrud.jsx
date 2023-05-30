import React, { Component } from "react";
import "./BlogCrud.css";

export default class BlogCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      title: "",
      text: "",
      image: null,
      date: "",
      time: "",
      isEdit: false,
      id: null,
      imgValid: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateBlog = this.handleCreateBlog.bind(this);
    this.handleUpdateBlog = this.handleUpdateBlog.bind(this);
    this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
    this.handleEditBlog = this.handleEditBlog.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MB

    if (fileSize > 5) {
      // maximum file size of 5 MB
      alert("File size must be less than 5 MB");
      event.target.value = null; // reset the file input field
    } else {
      // proceed with uploading the file

      const reader = new FileReader();

      reader.onload = (event) => {
        this.setState({ image: event.target.result });
      };

      reader.readAsDataURL(file);
    }
  };

  componentDidMount() {
    fetch("http://44.216.18.228:3001/blogs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ blogs: data });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleCreateBlog(event) {
    event.preventDefault();

    if(this.state.image){
    const data = {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
      date: this.state.date,
      time: this.state.time,
    };

    fetch("http://44.216.18.228:3001/admin/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogs: [...this.state.blogs, data],
          title: "",
          text: "",
          image: "",
          date: "",
          time: "",
        });
      });
    }

    else{
      alert("Please attach the Image")
    }
  }

  handleUpdateBlog(event) {
    event.preventDefault();

    if(this.state.image){

    const data = {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
      date: this.state.date,
      time: this.state.time,
    };
    fetch(`http://44.216.18.228:3001/admin/blogs/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        const updatedBlog = {
          id: this.state.id,
          title: this.state.title,
          text: this.state.text,
          image: this.state.image,
          date: this.state.date,
          time: this.state.time,
        };
        const index = this.state.blogs.findIndex(
          (blog) => blog.id === this.state.id
        );
        const blogs = [...this.state.blogs];
        blogs[index] = updatedBlog;
        this.setState({
          blogs: blogs,
          title: "",
          text: "",
          image: "",
          date: "",
          time: "",
          isEdit: false,
          id: null,
        });
      }
    });

  }

  else{
    alert("Please attach Image")
  }
  }

  handleDeleteBlog(id) {
    fetch(`http://44.216.18.228:3001/admin/blogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        const blogs = this.state.blogs.filter((blog) => blog.id !== id);
        this.setState({ blogs: blogs });
      }
    });
  }

  handleEditBlog(blog) {
    this.setState({
      title: blog.title,
      text: blog.text,
      image: blog.image,
      date: blog.date,
      time: blog.time,
      isEdit: true,
      id: blog.id,
    });
  }

  handleCancelEdit() {
    this.setState({
      title: "",
      text: "",
      image: "",
      date: "",
      time: "",
      isEdit: false,
      selectedBlogId: null,
    });
  }

  render() {
    const blogs = this.state.blogs;
    return (
      <div className="container">
        <form
          id="blogForm"
          onSubmit={
            this.state.isEdit ? this.handleUpdateBlog : this.handleCreateBlog
          }
        >
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Text:</label>
            <textarea
              className="form-control"
              id="text"
              name="text"
              rows="5"
              value={this.state.text}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:<em Style={"color:red;"}>*</em></label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={this.handleImageChange}
            />
                          <div className="invalid-feedback">Please enter a valid value.</div>

          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
            />


          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {this.state.isEdit ? "Update" : "Create"}
            </button>
            {this.state.isEdit && (
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={this.handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-4">
          {blogs.length ? (
            blogs.map((blog) => (
              <div className="card my-3" key={blog.id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-3">
                      <img className="bmImage" src={blog.image} alt=""></img>
                    </div>
                    <div className="col-9" Style={"    text-align: initial;"}>
                      <h5 className="card-title bmTitle">{blog.title}</h5>
                      <p className="card-text bmText">{blog.text}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {blog.date} at {blog.time}
                        </small>
                      </p>
                    </div>
                  </div>

                  <div className="bmBts">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => this.handleEditBlog(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDeleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs to display</p>
          )}
        </div>
      </div>
    );
  }
}
