import React, { Component } from "react";
import "./homePage.css";

class HomePage extends Component {
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
                  An AI based system which provides you with the medical prescription based on your symptoms by using the NLP natural language processing
                </p>
                <p>
                  MEDICAL SPHERE will give you goosebumps with its AI Prescribtion.{" "}
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
                <h1>Laboratory Services</h1>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
              </section>
            </div>
            <div class="card">
              <section>
                <h1>General Treatment</h1>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
              </section>
            </div>
            <div class="card">
              <section>
                <h1>Orthopedician</h1>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
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
            <h1>Our Gallery Portfolio</h1>
          </div>
          <div class="row">
            <div class="column">
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(1)"
                class="hover-shadow cursor"
              />
            </div>
            <div class="column">
              <img
              
                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(2)"
                class="hover-shadow  cursor"
                alt=""

              />
            </div>
            <div class="column">
              <img                alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(3)"
                class="hover-shadow  cursor"
              />
            </div>
            <div class="column">
              <img                alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(4)"
                class="hover-shadow  cursor"
              />
            </div>
            <div class="column">
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(5)"
                class="hover-shadow  cursor"
              />
            </div>
            <div class="column">
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(6)"
                class="hover-shadow  cursor"
              />
            </div>
            <div class="column">
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(7)"
                class="hover-shadow  cursor"
              />
            </div>
            <div class="column">
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                Style="width:100%; height:100%;"
                onclick="openModal();currentSlide(8)"
                class="hover-shadow  cursor"
              />
            </div>
          </div>
        </section>
        <div id="myModal" class="modal">
          <span class="close cursor" onclick="closeModal()">
            &times;
          </span>
          <div class="modal-content">
            <div class="mySlides">
              <div class="numbertext">1 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">2 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">3 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">4 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">5 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">6 / 7</div>
             <img alt=""

                src="https://i.ibb.co/Sft7gKp/bg2.webp"
                class="animate"
                Style="width:100%"
              />
            </div>

            <div class="mySlides">
              <div class="numbertext">7 / 7</div>
             <img alt=""

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

       <img alt=""
 src="https://i.ibb.co/ZLHbWJz/footer.png" class="footer_image" />
        <footer>
          <div class="column">
            <span class="footer_title">COMPANY_NAME</span>
            <a href="/#">

              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </a>
            <a href="/#" title="Facebook">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="/#" title="Instagram">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="/#" title="Twitter">
              <i class="fa fa-twitter"></i>
            </a>
          </div>
          <div class="column">
            <a href="/#" class="footer_title">OTHER LINKS</a>
            <a href="/#">Privacy Policy</a>
            <a href="/#">Terms & Conditions</a>
            <a href="/#">Ticket</a>
            <a href="/#">Contact Us</a>
          </div>
          <div class="column">
            <a href="/#" class="footer_title">SHORT CUT</a>
            <a href="/#">Our Services</a>
            <a href="/#">Our Blog</a>
            <a href="/#">Our Projects</a>
            <a href="/#">About Us</a>
          </div>
          <div class="column">
            <a href="/#" class="footer_title">LATEST NEWS</a>
            <a href="/#" title="Lorem ipsum dolor sit amet">
             <img alt=""
 src="https://source.unsplash.com/50x50/?green,trees" />
            </a>
            <a href="/#" title="Lorem ipsum dolor sit amet">
             <img alt=""
 src="https://source.unsplash.com/50x50/?green,tree" />
            </a>
            <a href="/#" title="Lorem ipsum dolor sit amet">
             <img alt=""
 src="https://source.unsplash.com/50x50/?green,plant" />
            </a>
            <a href="/#" title="Lorem ipsum dolor sit amet">
             <img alt=""
 src="https://source.unsplash.com/50x50/?green,forest" />
            </a>
            <a href="/#" title="Lorem ipsum dolor sit amet">
             <img alt=""
 src="https://source.unsplash.com/50x50/?green,afforestation" />
            </a>
          </div>
          <div class="column">
            <a href="/#" class="footer_title">GET IN TOUCH</a>
            <a href="/#" title="Address">
              <i class="fa fa-map-marker"></i> 007, street, province/state,
              country - zipcode
            </a>
            <a href="emailto:" title="Email">
              <i class="fa fa-envelope"></i> email@serviceprovider.domain
            </a>
            <a href="tel:" title="Contact">
              <i class="fa fa-phone"></i> +(x)-xxxx-xxxxx
            </a>
          </div>

          <div class="sub-footer">
            © CopyRights 2021 Company_name || All rights reserved
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
