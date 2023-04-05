import React, { Component } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/blogs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ blogs: data });
      });
  }
  render() {
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
                <div class="form">
                  <h4 Style={"margin-bottom:15px"}>Please enter your</h4>
                  <h1>Symptoms</h1>
                  <input
                    type="text"
                    name="s1"
                    id="fname"
                    placeholder="Symptom 1"
                    maxlength="60"
                    required
                  />
                  <input
                    type="email"
                    name="s2"
                    id="email"
                    placeholder="Symptom 2"
                    maxlength="100"
                    required
                  />
                  <input
                    type="text"
                    name="s3"
                    id="s3"
                    placeholder="Symptom 3"
                    required
                  />
                  {/* <select name="service">
                    <option value="emergencyservice">Emergency Service</option>
                    <option value="certifiedservice">Certified Service</option>
                  </select> */}
                  <button type="submit" class="btn2">
                    GET PRESCRIPTION
                  </button>
                </div>
              </td>
              <td>
                <em>Get Prescription</em>
                <h1>Get Prescription based on your symptoms</h1>
                <p>
                  An AI based system which provides you with the medical
                  prescription based on your symptoms by using the NLP natural
                  language processing
                </p>
                <p>
                  MEDICAL SPHERE will give you goosebumps with its AI
                  Prescribtion.{" "}
                </p>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
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
