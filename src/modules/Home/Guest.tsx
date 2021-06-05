import React, { PureComponent } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Guest.scss';

import onlineBatchImg from 'images/online_batch.png';
import clipboardImg from 'images/clipboard.png';
import skillsPng from 'images/skills.png';
import testImg from 'images/test.png';
import availabilityImg from 'images/availability.png';
import onlineLearningImg from 'images/online_learning.svg';
import eduImg3 from 'images/edu3.jpg';
import eduImg2 from 'images/edu2.jpg';
import eduImg1 from 'images/edu1.jpg';
import eduImg from 'images/edu.png';
import eduLogo from 'images/edu-logo.svg';
import { Footer } from 'layouts';

export class Guest extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      headerClassname: 'bg-transparent',
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const offset = window.scrollY;
    if (offset > 10) {
      this.setState({ headerClassname: 'header-sticky' });
    } else {
      this.setState({ headerClassname: 'bg-transparent' });
    }
  }

  render() {
    return (
      <>
        <div className="home-wrapper wrapper">
          <header className={`header ${this.state.headerClassname}`}>
            <div className="container h-100">
              <div className="d-flex align-items-center h-100">
                <Navbar.Brand className="d-flex align-items-center" href="/">
                  <img
                    className="h-40p w-40p mr-2"
                    src={eduLogo}
                    alt="logo"
                  />
                  <span
                    className={'d-none d-lg-block turq_color h2 mb-0'
                      + ' font-weight-600'}
                  >
                    LMS
                  </span>
                </Navbar.Brand>
                <Nav className="ml-auto d-lg-flex">
                  <Link
                    className="btn default-btn mr-3 nav-link"
                    to="/auth/login"
                  >
                    Log in
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={['fas', 'sign-in-alt']}
                    />
                  </Link>
                  <Link
                    className="btn turquoise-btn nav-link"
                    to="/auth/signup"
                    role="button"
                  >
                    Sign up
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={['fas', 'user-plus']}
                    />
                  </Link>
                </Nav>
              </div>
            </div>
          </header>
          <section className="main-banner">
            <div className="banner-content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="text-container">
                      <h1>
                        Study Beyond The
                        <strong className="turq_color"> Classroom</strong>
                      </h1>
                      <h4 className="text-muted">
                        Study any topic, anytime. Choose from thousands
                        of expert-led courses now.
                      </h4>
                      <Link className="btn turquoise-btn btn-lg mt-4" to="/">
                        Get Started
                        <FontAwesomeIcon
                          className="ml-2"
                          icon={['fas', 'hand-point-right']}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="image-container">
                      <img
                        className="img-fluid"
                        src={eduImg}
                        alt="edu"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="course-grid">
            <h2 className="text-center mb-70 section-head">
              One platform for all your
              <span className="turq_color"> Career</span>
              {' '}
              growth
            </h2>

            <div className="container">
              <div className="course-row row">
                <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="course-col top-pattern">
                    <div className="w-100">
                      <img
                        className="img-fluid rounded-lg"
                        src={eduImg1}
                        alt="edu1"
                      />
                    </div>
                    <div className="course-content">
                      <div className="h4 text-a-d-3">
                        K12 Classes
                      </div>
                      <p className="text-muted mt-2">
                        Every topic and concept for all boards & curriculums
                        inclusive  of CBSE, ICSE, REGIONAL & CENTRAL.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="course-col">
                    <div className="w-100">
                      <img
                        className="img-fluid rounded-lg"
                        src={eduImg2}
                        alt="edu1"
                      />
                    </div>
                    <div className="course-content">
                      <div className="h4 text-a-d-3">
                        Competitive Exams
                      </div>
                      <p className="text-muted mt-2">
                        Structured Courses, Adaptive Practice, Live Online
                        Classes, Live Tests & Personalised feedbacks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
                  <div className="course-col">
                    <div className="w-100">
                      <img
                        className="img-fluid rounded-lg"
                        src={eduImg3}
                        alt="edu1"
                      />
                    </div>

                    <div className="course-content">
                      <div className="h4 text-a-d-3">
                        Higher Studies
                      </div>
                      <p className="text-muted mt-2">
                        Case Studies, Practical Compilations, Opinion Building,
                        Leadership Tunnels, Discovery & Conclusions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mb-md-0">
                  <div className="course-col bottom-pattern">
                    <div className="w-100">
                      <img
                        className="img-fluid rounded-lg"
                        src={eduImg3}
                        alt="edu1"
                      />
                    </div>
                    <div className="course-content">
                      <div className="h4 text-a-d-3">
                        Skill Building
                      </div>
                      <p className="text-muted mt-2">
                        Training & Support helping startups volunteer
                        opportunities to transform India into a global hub.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="lms-grid">
            <h2 className="text-center mb-70 section-head">
              Best
              <span className="turq_color"> Learning Platform</span>
              {' '}
              for growth
            </h2>

            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="lms_row row">
                    <div className="lms-col d-flex">
                      <span className="round-icon">
                        <img
                          className="img-fluid rounded-lg"
                          src={onlineBatchImg}
                          alt="edu1"
                        />
                      </span>

                      <div className="lms_text ml-3">
                        <h4>Live online batches.</h4>
                        <p>
                          Join live batches & get access to online classrooms.
                        </p>
                      </div>
                    </div>

                    <div className="lms-col d-flex">
                      <span className="round-icon">
                        <img
                          className="img-fluid rounded-lg"
                          src={clipboardImg}
                          alt="edu1"
                        />
                      </span>

                      <div className="lms_text ml-3">
                        <h4>Expert-led structured courses.</h4>
                        <p>Learn On Your Schedule. Study any topic, anytime.</p>
                      </div>
                    </div>

                    <div className="lms-col d-flex">
                      <span className="round-icon">
                        <img
                          className="img-fluid rounded-lg"
                          src={skillsPng}
                          alt="edu1"
                        />
                      </span>

                      <div className="lms_text ml-3">
                        <h4>Adaptive Practice.</h4>
                        <p>
                          Do practice specific to your needs & skills, and
                          clear your concepts.
                        </p>
                      </div>
                    </div>

                    <div className="lms-col d-flex">
                      <span className="round-icon">
                        <img
                          className="img-fluid rounded-lg"
                          src={testImg}
                          alt="edu1"
                        />
                      </span>

                      <div className="lms_text ml-3">
                        <h4>All India Level Live Tests.</h4>
                        <p>
                          Appear in all India level exams & assess your level
                          with others.
                        </p>
                      </div>
                    </div>

                    <div className="lms-col d-flex">
                      <span className="round-icon">
                        <img
                          className="img-fluid rounded-lg"
                          src={availabilityImg}
                          alt="edu1"
                        />
                      </span>

                      <div className="lms_text ml-3">
                        <h4>24/7 Doubt Clearing Help Centre.</h4>
                        <p>
                          Give a direct call or chat with our experts to
                          enhance your understanding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-5 cl-md-12 col-12 d-flex align-items-center"
                >
                  <img
                    className="img-fluid"
                    src={onlineLearningImg}
                    alt="edu"
                  />
                </div>
              </div>

              <div className="mt-3 text-center">
                <Link className="btn turquoise-btn btn-lg mt-4" to="/">
                  Get Started
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={['fas', 'hand-point-right']}
                  />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </>
    );
  }
}
