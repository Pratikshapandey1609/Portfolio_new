import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="Pratikshapandey1609"
        blockSize={15}
        blockMargin={5}
        color="#c084f5"
        fontSize={16}
      />
    </Row>
  );
}

export default Github;


// import React from "react";
// import GitHubCalendar from "react-github-calendar";
// import { Row, Col } from "react-bootstrap";

// function Github() {
//   return (
//     <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
//       <Col xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
//         <h2>
//           My <strong style={{ color: "#c084f5" }}>Coding Journey</strong>
//         </h2>
//         <p style={{ fontSize: "16px", color: "#555" }}>
//           Tracking my GitHub contributions and growth over time.
//         </p>
//       </Col>

//       <Col xs={12} style={{ textAlign: "center" }}>
//         <GitHubCalendar
//           username="Pratikshapandey1609"
//           blockSize={15}
//           blockMargin={5}
//           color="#c084f5"
//           fontSize={16}
//         />
//       </Col>
//     </Row>
//   );
// }

// export default Github;
