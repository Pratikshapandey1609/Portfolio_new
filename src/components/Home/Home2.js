import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I got interested in <b className="purple">coding</b>, and ever since it has
              been a journey full of learning and creativity. ✨
              <br />
              <br />
              For now, I’m deeply interested in{" "}
              <i>
                <b className="purple">Web Development</b>
              </i>{" "}
              and enjoy working with technologies like{" "}
              <i>
                <b className="purple">Java , JavaScript, React.js, Node.js, and the MERN stack.</b>
              </i>
              <br />
              <br />
              My curiosity also pushes me to explore{" "}
              <i>
                <b className="purple">DevOps , Data Analytics </b>
              </i>{" "}
              through projects and hackathons, where I love turning ideas into something
              meaningful. 🚀
              <br />
              <br />
              Apart from coding, I also enjoy being part of the tech community as a{" "}
              <b className="purple">GDG & GDSC Social Media Manager</b>, where I combine my
              passion for development and community growth.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar"
              style={{ width: "300px", height: "300px", objectFit: "cover" }} 
              />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>LET’S CONNECT</h1>
            <p>
              Always open to <span className="purple">collaborations</span> and new opportunities ✨
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Pratikshapandey1609"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/pratiksha-pandey-147770276/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/miss_pandey600/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
