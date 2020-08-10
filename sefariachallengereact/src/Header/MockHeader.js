import React, { Component } from "react";
import "./MockHeader.css";
import Logo from './logo.png';
import Magnifier from './magnifier.png';
import Globe from './globe.png';
import Bars from './bars.png';

class MockHeader extends Component {
  render() {
    return (
      <div id="s2" className="headerOnly"><div id="readerAppWrap" data-reactroot=""><div className="readerApp multiPanel interface-english"><div className="header" role="banner"><div className="headerInner"><div className="headerNavSection"><div className="library"><img className="bars" src={Bars}/></div><div id="searchBox" className="searchBox"><span className="readerNavMenuSearchButton"><img src={Magnifier}/></span><input className="search keyboardInput" id="searchInput" placeholder="Search" maxLength="75" title="Search for Texts or Keywords Here"/></div></div><div className="headerHomeSection"><div className="home"><img src={Logo}/></div></div><div className="headerLinksSection"><div className="accountLinks anon"><div className="login loginLink"><span className="int-en">Log in</span><span className="int-he">התחבר</span></div><a className="login signupLink" href="#"><span className="int-en">Sign up</span><span className="int-he">הרשם</span></a></div><div className="interfaceLinks"><div className="interfaceLinks-button"><img className="globe" src={Globe}/></div><div className="interfaceLinks-menu closed"><div className="interfaceLinks-header"><span className="int-en">Site Language</span><span className="int-he">שפת האתר</span></div><div className="interfaceLinks-options"><div className="interfaceLinks-option int-bi " href="/interface/hebrew?next=/">עברית</div><div className="interfaceLinks-option int-bi active" href="/interface/english?next=/">English</div></div></div></div></div></div></div></div></div></div>
    );
  }
}

export default MockHeader;
