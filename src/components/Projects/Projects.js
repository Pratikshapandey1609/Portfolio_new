import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import expennse from "../../Assets/Projects/expennse.png"
import speakEasy from "../../Assets/Projects/SpeakEasy.png"
import talentFlux from "../../Assets/Projects/TalentFlux.png"
import astroai from "../../Assets/Projects/AstroAI.png"

function Projects() {
  return (
    <Container fluid className="project-section">
      {/* <Particle /> */}
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={speakEasy}
              isBlog={false}
              title="Chat_App"
              description="Personal Chat Room or Workspace to share resources and hangout with friends build with react.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages."
              ghLink="https://github.com/Pratikshapandey1609/RealTime_ChatApp"
            //demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={talentFlux}
              isBlog={false}
              title="Resume_Parsing"
              description="My personal blog page build with Next.js and Tailwind Css which takes the content from makdown files and renders it using Next.js. Supports dark mode and easy to write blogs using markdown."
              ghLink="https://github.com/Pratikshapandey1609/Resume-Parssing"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={expennse}
              isBlog={false}
              title="Expense Tracker"
              description="An interactive Expense Tracker Dashboard built with React.js and Tailwind CSS that visualizes income and expense insights using Recharts, featuring dynamic charts, smooth animations, and a responsive UI."
              ghLink="https://github.com/Pratikshapandey1609/Expense-Tracker"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={astroai}
              isBlog={false}
              title="Astro_AI"
              description="An AI-powered Resume Analyzer built with the MERN stack that evaluates resumes, provides improvement suggestions, supports job-role-based analysis, and features a modern, animated, and multilingual UI with dark/light mode."
              ghLink="https://github.com/Pratikshapandey1609/Astro_AI1"
            //demoLink=""
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
