import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiJavascript1, DiReact, DiNodejs, DiJava } from "react-icons/di";
import { SiRedux, SiRedis, SiAzuredevops,SiMaterialdesign, SiExpress, SiPowerbi, SiMysql } from "react-icons/si";

function Techstack() {
  return (
    <>
      {/* Main Tech Stack */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Tech Stack</h2>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <DiJavascript1 />
          
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiReact />
         
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiRedux />
          
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiNodejs />
         
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiExpress />
     
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiJava />
         
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiMysql />
      
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiRedis />
        
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiMaterialdesign />
        
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPowerbi />
          
        </Col>
      </Row>

      {/* Exploring / Learning */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Currently Exploring</h2>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiAzuredevops size={50} />
        </Col>
      </Row>
    </>
  );
}

export default Techstack;


// import React from "react";
// import { Col, Row } from "react-bootstrap";
// import { CgCPlusPlus } from "react-icons/cg";
// import {
//   DiJavascript1,
//   DiReact,
//   DiNodejs,
//   DiMongodb,
//   DiPython,
//   DiGit,
//   DiJava,
// } from "react-icons/di";
// import {
//   SiRedis,
//   SiFirebase,
//   SiNextdotjs,
//   SiSolidity,
//   SiPostgresql,
// } from "react-icons/si";
// import { TbBrandGolang } from "react-icons/tb";

// function Techstack() {
//   return (
//     <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
//       <Col xs={4} md={2} className="tech-icons">
//         <DiJavascript1 />
//       </Col>

//       <Col xs={4} md={2} className="tech-icons">
//         <DiNodejs />
//       </Col>
//       <Col xs={4} md={2} className="tech-icons">
//         <DiReact />
//       </Col>

//       <Col xs={4} md={2} className="tech-icons">
//         <DiMongodb />
//       </Col>
    
//       <Col xs={4} md={2} className="tech-icons">
//         <DiGit />
//       </Col>
//       <Col xs={4} md={2} className="tech-icons">
//         <SiFirebase />
//       </Col>
//       <Col xs={4} md={2} className="tech-icons">
//         <SiRedis />
//       </Col>
      
      
//       <Col xs={4} md={2} className="tech-icons">
//         <DiJava />
//       </Col>
//     </Row>
//   );
// }

// export default Techstack;
