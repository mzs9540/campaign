import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.scss';

import playStoreImg from 'images/playstore.png';
import appleStoreImg from 'images/apple_store.png';
import eduLogo from 'images/edu-logo.svg';

export function Footer() {
  return (
    <footer className="border-top">
      <div className="container">
        <div className="row pt-5 pb-3">
          <div className="col-12 col-md-9">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-6">
                <h6>About</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/#">About Us</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Checkout</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Contact</Link>
                  </li>
                  <li className="">
                    <Link to="/#">Blog</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 col-6">
                <h6>Policy</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/#">FAQs</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">T&C</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Privacy Policy</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">sitemap</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-6">
                <h6>Help</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/#">
                      Documentation
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Mail Us</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">payments</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">cancellation & returns</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-3 col-6">
                <h6>Campaigns</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/courses">Message</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Email</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/#">Push notifications</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="footer-logo">
              <div className="d-flex align-items-center h2 mb-2">
                <img
                  className="h-40p w-40p mr-2"
                  src={eduLogo}
                  alt="logo"
                />
                <span
                  className=" d-block turq_color h2 mb-0 font-weight-600"
                >
                  Campaigns
                </span>
              </div>
              <div className="w-100">
                <p className="mb-1">
                  <span>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={['fas', 'map-marker-alt']}
                    />
                  </span>
                  4967 Sardis Sta, Victoria 8007, Montreal.
                </p>
                <p className="mb-1">
                  <span>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={['fas', 'phone-alt']}
                    />
                  </span>
                  +1 246-345-0695
                </p>
                <p className="mb-1">
                  <span>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={['fas', 'envelope']}
                    />
                  </span>
                  info@learnup.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row grey-border py-3">
          <div className="footer-bottom-row col-lg-12 col-12 d-flex">
            <ul className="list-unstyled d-flex align-items-center mb-0">
              <li className="mr-2">
                <Link to="/" className="store-btns">
                  <img
                    src={playStoreImg}
                    alt="playstore"
                  />
                </Link>
              </li>
              <li>
                <Link to="/" className="store-btns">
                  <img
                    src={appleStoreImg}
                    alt="apple_store"
                  />
                </Link>
              </li>
            </ul>
            <span>© 2021 CMS Technologies Pvt, Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
