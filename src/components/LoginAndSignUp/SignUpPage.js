import React from 'react'

function SignUpPage({setNeedLogin, setSignupFormActive}) {
  return (
    <div className="sign-form">
      <h1 className="sign-title">Join Twitter today</h1>
      <button className="google-btn">Sign up with Google</button>
      <button className="apple-btn">Sign up with Apple</button>
      <div className="sign-line-div">
        <div className="sign-break-line"></div>
        <div className="sign-break-line-m">or</div>
        <div className="sign-break-line"></div>
      </div>
      <button onClick={() => setSignupFormActive(true)} className="signup-page-btn">Sign up with phone or email</button>
      <div className="sign-up-info">
        By signing up, you agree to the
        <a href="https://twitter.com/en/tos" rel="noreferrer" target="_blank">
          {" "}
          Terms of Service{" "}
        </a>
        and{" "}
        <a
          href="https://twitter.com/en/privacy"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Privacy Policy{" "}
        </a>
        including{" "}
        <a
          href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Cookies Use.
        </a>
      </div>
      <div className="no-acc-div">
        Have an account already?
        <span role="button" onClick={() => setNeedLogin(true)}>
          {" "}
          Log in
        </span>
      </div>
    </div>
  );
}

export default SignUpPage