import React from "react";
import './Home.css';

import './css/bootstrap.min.css'
import './css/agency.min.css'

function Home() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand js-scroll-trigger" href="#page-top"></a>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i className="fa fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav text-uppercase ml-auto">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#features">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#working">Working</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#team">Team</a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  
  <header className="masthead">
    <div className="container">
      <div className="intro-text">
        <div className="heading-dstore" > DSTORE </div>
        <div className="intro-heading-text-uppercase">DECENTRALISED CLOUD STORAGE</div>
        <a id="btn1" className="btn-three btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#features">Tell Me More</a>
        <a id="btn1" className="btn-three btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="/authenticate">Get Started</a>
      </div>
    </div>
  </header>

  
  <section className="page-section" id="features">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Features</h2>
          <br/>
          <h3 className="section-subheading text-muted">DStore aims to provide users with the following features.</h3>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-solid fa-key fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Private</h4>
          <p className="text-muted">The files are encrypted by the user before uploading to the IPFS. As a result, the files cannot be accessed by anyone other than you and the people you share them with.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-solid fa-lock fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Secure</h4>
          <p className="text-muted">Each file is encrypted, split into pieces and stored in a decentralized manner. This protects your data from breaches and other malicious attacks.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-solid fa-check fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Available</h4>
          <p className="text-muted">The decentralized network of nodes eliminates single points of failure. Therefore, data is always available when you need it and can scale as your need grows.</p>
        </div>
      </div>
      <br/>
      <div className="row text-center">
        
      </div>
    </div>
  </section>

  
  {/* <Portfolio portfolioLinks={portfolioLinks}></Portfolio>*/

  
  <section className="page-section" id="working">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">How it works</h2>
          {/* <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> */}
          <br/><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <ul className="timeline">
            <li>
              <div className="timeline-image">
              <br/>
              <h4>Step 1</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  
                  <h4 className="subheading">File is encrypted</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">DStore encrypts the file before uploading it to the IPFS. Every file is encrypted using AES-256 symmetric encryption. The passphrase is provided by the user and DStore does not save it anywhere. This maintains the confidentiality of the user’s data.</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
              <br/>
              <h4>Step 2</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                 
                  <h4 className="subheading">Encrypted file is split into pieces</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">After being encrypted, the file is uploaded to the IPFS. IPFS first splits the encrypted file into pieces. The pieces are cryptographically hashed and given a unique fingerprint called a content identifier(CID). This CID acts as a permanent record of the file as it exists at that point in time.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
              <br/>
              <h4>Step 3</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="subheading">Pieces are distributed across the nodes</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">The file pieces are sent to different nodes across the peer-to-peer (P2P) network. The pieces are replicated on multiple nodes for the high availability of the file.</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
            <br/>
              <h4>Step 4</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  
                  <h4 className="subheading">IPFS hash is generated</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">The CIDs of the file pieces are linked together using InterPlanetary Linked Data. IPLD is a set of standards and implementations for creating decentralized data structures that are universally addressable and linkable. The IPFS returns the hash generated to the application.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
              <br/>
              <h4>Step 5</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="subheading">Blockchain stores the IPFS hashes</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">The file's IPFS hash is stored on the blockchain for easy access. The Ethereum blockchain network allows the use of smart contracts through which the hash value is stored and retrieved from the blockchain.</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
            <br/>
              <h4>Step 6</h4>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  
                  <h4 className="subheading">File is retrieved when needed</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">When the user wants to download the file, DStore fetches the IPFS hash of the file from the blockchain. The pieces are extracted from the P2P network and merged together. The user can download the file after decrypting it with the passphrase.</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <br/>
                <h4>Original File</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  }

  
  <section className="bg-light page-section" id="team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
          <br/><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={require('./img/team/Amudhini.jpeg')} alt=""/>
            <h4>Amudhini P K</h4>
            <br/>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={require('./img/team/Aravinda.jpeg')} alt=""/>
            <h4>Aravinda B</h4>
            <br/>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={require('./img/team/Divyashree.jpeg')} alt=""/>
            <h4>Divyashree S</h4>
            <br/>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <p className="large text-muted">Students of Vellore Institute of Technology</p>
        </div>
      </div>
    </div>
  </section>

  
  <section className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt=""/>
          </a>
        </div>
        <div className="col-md-3 col-sm-6">
          <a href="#something">
            <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt=""/>
          </a>
        </div>
      </div>
    </div>
  </section>

  
  <section className="page-section" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Contact Us</h2>
          <br/><br/><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form id="contactForm" name="sentMessage" novalidate="novalidate">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control" id="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number."/>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea className="form-control" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-lg-12 text-center">
                <div id="success"></div>
                <button id="sendMessageButton" className="btn btn-primary btn-xl text-uppercase" type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  
  <footer className="footer">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <span className="copyright">Copyright &copy; DStore 2021</span>
        </div>
        <div className="col-md-4">
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </footer>
    </div>
  );
}

export default Home;