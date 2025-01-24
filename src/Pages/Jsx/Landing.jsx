import React, { useEffect } from "react";
import NavBar from "../../Components/Jsx/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { useAuth } from "../../Context";
import Card from "../../Components/Jsx/Card";
import "../Styles/Landing.css";
import oldPaper from "../../assets/oldpapers.png";
import studyNotes from "../../assets/studynotes.png";
import colab from "../../assets/colab.png";
import senior from "../../assets/senior.png";
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import step4 from "../../assets/step4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faBookSkull,
  faDashboard,
  faDownload,
  faExchange,
  faHandshake,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
function Landing() {
  const { user_info } = useAuth();
  if (user_info) {
    return <Navigate to={PageRoutes.Dashboard + user_info?.name} />;
  }
  return (
    <div className="page">
      <NavBar />
      <div className="main">
        <div className="left">
          <p className="heading">
            Ace Exams with Notes, Advice, and a Community{" "}
            <span className="primary">That Cares!</span>
          </p>
          <p className="sub-heading">
            <span className="primary">Explore a world of resources ———</span>{" "}
            <br />
            From old papers to expert advice and real connections. Join a
            thriving student community built to help you succeed.
          </p>
          <div className="buttons">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">View Study Materials</button>
          </div>
        </div>
        <div className="right image-right"></div>
      </div>

      <h1 className="section-header">What We Offer</h1>
      <h3 className="section-subheader">
        Take a look at the services that we offer.
      </h3>
      <div className="card-container">
        <Card
          image={oldPaper}
          title="Old Papers"
          subtitle={
            "Prepare smarter with access to previous year's question papers."
          }
        />
        <Card
          image={studyNotes}
          title="Study Notes"
          subtitle={
            "Find and share concise, high-quality notes for every subject and topic."
          }
        />
        <Card
          image={senior}
          title="Senior Advice"
          subtitle={
            "Get tips, tricks, and guidance straight from experienced seniors."
          }
        />
        <Card
          image={colab}
          title="Collaborate & Share"
          subtitle={
            "Join discussions, clarify doubts, and share knowledge with peers."
          }
        />
      </div>

      <h1 className="section-header">Share Knowledge, Unlock Success!</h1>
      <h3 className="section-subheader">
        Empowering students to help each other by sharing notes and resources.
      </h3>
      <div className="steps-container">
        <div className="step">
          <h1 className="numbering">
            1<FontAwesomeIcon icon={faUpload} />
          </h1>
          <h3 className="text">
            <h1 className="primary">Upload Your Notes</h1>
            Contribute to the community by uploading your class notes, study
            guides, or solved papers.
          </h3>
        </div>
        <div className="step">
          <h3 className="text">
            <h1 className="primary">Explore the Library</h1>
            Access an ever-growing library of notes and resources shared by
            students like you.
          </h3>
          <h1 className="numbering">
            <FontAwesomeIcon icon={faBookOpen} />2
          </h1>
        </div>
        <div className="step">
          <h1 className="numbering">
            3<FontAwesomeIcon icon={faDownload} />
          </h1>
          <h3 className="text">
            <h1 className="primary">Download What You Need</h1>
            Find and download notes for your exams, assignments, or projects
            with ease
          </h3>
        </div>

        <div className="step">
          <h3 className="text">
            <h1 className="primary ">Grow Together</h1>
            Help others succeed and benefit from a collaborative community of
            learners.
          </h3>
          <h1 className="numbering">
            <FontAwesomeIcon icon={faHandshake} />4
          </h1>
        </div>
      </div>
      <footer>
        <h1>&copy; PassHonaHai</h1>
      </footer>
    </div>
  );
}

export default Landing;
