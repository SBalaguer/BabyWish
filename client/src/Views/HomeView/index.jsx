import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function HomeView() {
  return (
    <div className="home-page">
      <h1 className="home-page_title">
        <span className="home-page_baby">Baby</span>
        <span className="home-page_wish">Wish</span>
      </h1>
      <div className="home-page_buttons">
        <Link to="/sign-in" className="btn btn-start btn-block">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn btn-start btn-block">
          Sign Up
        </Link>
        <Link to="/authentication/facebook" className="btn btn-start btn-block">
          Sign in with Facebook
        </Link>
      </div>
    </div>
  );
}
