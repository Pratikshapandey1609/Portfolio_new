import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Pratiksha Pandey </span>
            from <span className="purple"> Jabalpur, India.</span>
            <br />
            I am currently a <b className="purple">Computer Science student</b> at Shri Ram Institute of Technology.  
            <br />
            I’m exploring and building projects as a <b className="purple">MERN Stack Developer</b>, 
            with interests in <b className="purple">Web Development, And Java </b>.  
            <br />
            <br />
            Apart from coding, here are a few things I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Learning new languages like Spanish
            </li>
            <li className="about-activity">
              <ImPointRight /> Singing 🎶
            </li>
            <li className="about-activity">
              <ImPointRight /> Mentoring students
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Keep building, keep learning, and make an impact with your work!"{" "}
          </p>
          <footer className="blockquote-footer">Pratiksha</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;


// import React from "react";
// import Card from "react-bootstrap/Card";
// import { ImPointRight } from "react-icons/im";

// function AboutCard() {
//   return (
//     <Card className="quote-card-view">
//       <Card.Body>
//         <blockquote className="blockquote mb-0">
//           <p style={{ textAlign: "justify" }}>
//             Hi Everyone, I am <span className="purple">Pratiksha Pandey</span>
//             from <span className="purple"> Jabalpur, India.</span>
//             <br />
//             I am currently employed as a software developer at Juspay.
//             <br />
//             I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
//             Mesra.
//             <br />
//             <br />
//             Apart from coding, some other activities that I love to do!
//           </p>
//           <ul>
//             <li className="about-activity">
//               <ImPointRight /> Playing Games
//             </li>
//             <li className="about-activity">
//               <ImPointRight /> Writing Tech Blogs
//             </li>
//             <li className="about-activity">
//               <ImPointRight /> Travelling
//             </li>
//           </ul>

//           <p style={{ color: "rgb(155 126 172)" }}>
//             "Strive to build things that make a difference!"{" "}
//           </p>
//           <footer className="blockquote-footer">Soumyajit</footer>
//         </blockquote>
//       </Card.Body>
//     </Card>
//   );
// }

// export default AboutCard;
