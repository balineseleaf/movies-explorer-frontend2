import { Link } from "react-router-dom";
import './AuthCaption.css';
import React from "react";

function AuthCaption ({ question, link, linkName }) {
  return (
    <div className="auth-caption">
      <p className="auth-caption__question">{question}</p>
      <Link to={link} className="auth-caption__link">{linkName}</Link>
    </div>
  )
}

export default AuthCaption;