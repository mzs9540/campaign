import React from 'react';
import { Navbar, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AuthenticationLayout.scss';

import eduImg1 from 'images/edu1.jpg';
import eduImg2 from 'images/edu2.jpg';
import eduImg3 from 'images/edu3.jpg';
import eduImg4 from 'images/edu4.png';
import eduLogo from 'images/edu-logo.svg';

export function AuthenticationLayout(props: {
  children: React.ReactNode,
}) {
  return (
    <main>
      <div className="user-credentials-wrap vh-100 w-100">
        <div className="row vh-100">
          <div className="login-col login-col-left col-lg-6 col-md-5 col-12">
            <Navbar.Brand
              className="d-flex align-items-center mb-40 justify-content-center"
              href="/"
            >
              <img
                className="h-50p w-50p mr-2"
                src={eduLogo}
                alt="logo"
              />
              <span
                className="d-lg-block turq_color h2 mb-0 font-weight-600"
              >
                LMS
                <h5 className="dark-black-color">Study Beyond The Classroom</h5>
              </span>
            </Navbar.Brand>
            <div className="login-carousel w-100">
              <Carousel
                interval={3000}
                controls={false}
                className="indicator-a-d-3"
                slide
              >
                <Carousel.Item>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="d-block w-60"
                      src={eduImg1}
                      alt="First slide"
                    />
                    <div className="carousel_cntnt w-100 mt-30 text-center">
                      <h4 className="font-weight-bolder">
                        Live online batches.
                      </h4>
                      <p className="text-muted text-14">
                        Join live batches & get access to online classrooms.
                      </p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="d-block w-60"
                      src={eduImg3}
                      alt="First slide"
                    />
                    <div className="carousel_cntnt w-100 mt-30 text-center">
                      <h4 className="font-weight-bolder">
                        Expert-led structured courses.
                      </h4>
                      <p className="text-muted text-14">
                        Learn On Your Schedule. Study any topic, anytime.
                      </p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="d-block w-60"
                      src={eduImg2}
                      alt="First slide"
                    />
                    <div className="carousel_cntnt w-100 mt-30 text-center">
                      <h4 className="font-weight-bolder">
                        Adaptive Practice.
                      </h4>
                      <p className="text-muted text-14">
                        Do practice specific to your needs & skills,
                        and clear your concepts.
                      </p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      className="d-block w-60"
                      src={eduImg4}
                      alt="First slide"
                    />
                    <div className="carousel_cntnt w-100 mt-30 text-center">
                      <h4 className="font-weight-bolder">
                        Adaptive Practice.
                      </h4>
                      <p className="text-muted text-14">
                        Do practice specific to your needs & skills,
                        and clear your concepts.
                      </p>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="w-100 mt-70 text-center">
              <h3>Connect on Social Platforms</h3>
              {/* eslint-disable-next-line max-len */}
              <ul className="list-unstyled d-flex justify-content-center social-icons mt-20 mb-0">
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={['fab', 'youtube']} />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="login-col login-col-right col-lg-6 col-md-7 col-12">
            {props.children}
          </div>
        </div>
      </div>
    </main>
  );
}
