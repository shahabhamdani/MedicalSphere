import React, { Component } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";

import GaugeChart from 'react-gauge-chart';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      gender: 0,
      age: 0,
      smoking: 0,
      yellowFingers: 0,
      anxiety: 0,
      peerPressure: 0,
      chronicDisease: 0,
      fatigue: 0,
      allergy: 0,
      wheezing: 0,
      alcoholConsuming: 0,
      coughing: 0,
      shortnessOfBreath: 0,
      swallowingDifficulty: 0,
      chestPain: 0,
      percentage: 0,
    };
  }


  

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      gender: this.state.gender,
      age: this.state.age,
      smoking: this.state.smoking,
      yellowFingers: this.state.yellowFingers,
      anxiety: this.state.anxiety,
      peerPressure: this.state.peerPressure,
      chronicDisease: this.state.chronicDisease,
      fatigue: this.state.fatigue,
      allergy: this.state.allergy,
      wheezing: this.state.wheezing,
      alcoholConsuming: this.state.alcoholConsuming,
      coughing: this.state.coughing,
      shortnessOfBreath: this.state.shortnessOfBreath,
      swallowingDifficulty: this.state.swallowingDifficulty,
      chestPain: this.state.chestPain,
    };


    console.log(data)

    fetch("http://44.216.18.228:3001/lung-cancer-prediction/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>{
        this.setState({ percentage: Math.ceil(data) });

      } )
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    fetch("http://44.216.18.228:3001/blogs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ blogs: data });
      });
  }

  
  render() {

      let color = '';
      let label = '';
    if(this.state.percentage == 0){
      color =  'grey'
      label = '';
    } else
      if (this.state.percentage < 20) {
        color = 'darkgreen';
        label = this.state.percentage+'% Very low';
      } else if (this.state.percentage < 40) {
        color = 'green';
        label = this.state.percentage+'% Low';
      } else if (this.state.percentage < 60) {
        color = 'yellow';
        label = this.state.percentage+'% Moderate';
      } else if (this.state.percentage < 80) {
        color = 'orange';
        label = this.state.percentage+'% High';
      } else  {
        color = 'red';
        label = this.state.percentage+'% Very high';
      } 
    
      console.log(this.state.percentage)
      const gaugeOptions = {
        percent: this.state.percentage/100,
        colors: [color],
        arcPadding: 0.02,
        cornerRadius: 50,
        nrOfLevels: 5,
        needleColor: '#333',
        needleBaseColor: '#333',
        hideText: true,
      };

      
    return (
      <div>
        <div className="hero-section">
          <div class="container">
            <section>
              <em>WELCOME TO MEDICAL SPHERE</em>
              <h1>Take the world's best quality Treatment</h1>
              <h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </h4>
              <button href="#" class="btn1">
                Learn More
              </button>
            </section>
          </div>
        </div>

        <section class="section1">
          <table>
            <tr>
              <td>

              <form style={{  backgroundColor: "white" }} onSubmit={this.handleSubmit}>

                <div className="form" >
                  <h4 style={{ marginBottom: "15px"}}>Please enter your</h4>
                  <h1>Symptoms</h1>
                  <label>
                    Gender:
                    <select
                      name="gender"
                      value={this.state.gender}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </label>
                  <label>
                    Age:
                    <input
                      type="number"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                  <label>
                    Smoking:
                    <select
                      name="smoking"
                      value={this.state.smoking}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Yellow Fingers:
                    <select
                      name="yellowFingers"
                      value={this.state.yellowFingers}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Anxiety:
                    <select
                      name="anxiety"
                      value={this.state.anxiety}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Peer Pressure:
                    <select
                      name="peerPressure"
                      value={this.state.peerPressure}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Chronic Disease:
                    <select
                      name="chronicDisease"
                      value={this.state.chronicDisease}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Fatigue:
                    <select
                      name="fatigue"
                      value={this.state.fatigue}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Allergy:
                    <select
                      name="allergy"
                      value={this.state.allergy}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Wheezing:
                    <select
                      name="wheezing"
                      value={this.state.wheezing}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Alcohol Consuming:
                    <select
                      name="alcoholConsuming"
                      value={this.state.alcoholConsuming}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Coughing:
                    <select
                      name="coughing"
                      value={this.state.coughing}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Shortness Of Breath:
                    <select
                      name="shortnessOfBreath"
                      value={this.state.shortnessOfBreath}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Swallowing Difficulty:
                    <select
                      name="swallowingDifficulty"
                      value={this.state.swallowingDifficulty}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <label>
                    Chest Pain:
                    <select
                      name="chestPain"
                      value={this.state.chestPain}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </label>
                  <br></br>
<label>
<button className="btn-primary" type="submit">Submit</button>
</label>

<br></br>

<label>
<div>
      <GaugeChart id="gauge-chart1" {...gaugeOptions} />
      <p style={{ color }}>{label}</p>
    </div>
</label>
                 

                </div>
                </form>

              </td>
              
            </tr>
          </table>
        </section>

        <section class="section2">
          <div class="cards">
            <div class="card">
              <i class="fa fa-medkit"></i>
              <h2>Qualified Doctors</h2>
              <p>
                Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod
                tempor cididunt facilisis.
              </p>
            </div>
            <div class="card">
              <i class="fa fa-certificate"></i>
              <h2>Certified Services</h2>
              <p>
                Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod
                tempor cididunt facilisis.
              </p>
            </div>
            <div class="card">
              <i class="fa fa-stethoscope"></i>
              <h2>Advanced Equipment</h2>
              <p>
                Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod
                tempor cididunt facilisis.
              </p>
            </div>
            <div class="card">
              <i class="fa fa-heartbeat"></i>
              <h2>Emergency Service</h2>
              <p>
                Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod
                tempor cididunt facilisis.
              </p>
            </div>
          </div>
        </section>

        <section class="section3">
          <div class="cards">
            <div class="card">
              <section>
                <h1>Online Appointment Booking</h1>
                <h4>Users can book online appointment</h4>
              </section>
            </div>
            <div class="card">
              <section>
                <h1>Pharmacy Module</h1>
                <h4>
                  Patient can check his medicine code and get the medicine from
                  pharmacy
                </h4>
              </section>
            </div>
            <div class="card">
              <section>
                <h1>Health Blogs</h1>
                <h4>Users have access to our latest health blogs</h4>
              </section>
            </div>
          </div>
          <div class="content">
            <h1>We are well experienced doctors</h1>
            <p> </p>
          </div>
        </section>

        <section class="section4">
          <div class="title_header">
            <h1>Our Health Blogs</h1>
          </div>

          <div class="blog-posts-wrap">
            {this.state.blogs.length ? (
              this.state.blogs.map((blog) => (
                <div className=" my-3" key={blog.id}>
                  <Link class="post-link" to={`/blog/${blog.id}`}>
                    <div class="post-wrap">
                      <img class="post-image" src={blog.image} />
                      <div class="post-body">
                        <div class="post-body-primary">
                          <div class="post-meta">
                            <p>
                              by <b>Admin</b>
                              {blog.date + " " + blog.time}
                            </p>
                          </div>
                          <div class="post-title">
                            <h2>{blog.title}</h2>
                          </div>

                          <div class="post-text">
                            <p>{blog.text}</p>

                            {/* <div
                              style={{ maxHeight: "6em", overflow: "hidden" }}>
                              <p>{blog.text}</p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No blogs to display</p>
            )}
          </div>
        </section>

        <div id="myModal" class="modal">
          <span class="close cursor" onclick="closeModal()">
            &times;
          </span>
          <div class="modal-content">
            <div class="mySlides">
              <div class="numbertext">1 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">2 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">3 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">4 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">5 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">6 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">7 / 7</div>
              <img
                alt=""
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <a href="/#" class="prev" onclick="plusSlides(-1)">
              &#10094;
            </a>
            <a href="/#" class="next" onclick="plusSlides(1)">
              &#10095;
            </a>

            <div class="caption-container">
              <p id="caption"></p>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://i.ibb.co/ZLHbWJz/footer.png"
          class="footer_image"
        />
        <footer>
          <div class="sub-footer">
            © CopyRights 2023 MedicalSphere || All rights reserved
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
