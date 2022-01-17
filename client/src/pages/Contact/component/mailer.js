import React, { Component }  from 'react';
import emailjs from "emailjs-com";
import "./mailer.css";
const Mailer = () => {
  function sendEmail(e) {
    e.preventDefault();      
    emailjs.sendForm(
      "service_b1d47kd",
      "template_zey3hhz",
      e.target,
      "user_hBX7VKzwaBBO64bz99lqi"
    ).then(res=>{
       alert("Thank you for reporting the issue.");
        console.log(res);
    }).catch(err=> console.log(err));
  }
  return (
    <div
      className="container border"
      style={{
        marginTop: "35px",
        marginBottom: "50px",
        width: "60%",
        backgroundImage: `url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm222-mind-22_1_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=3d5d85909cafb6e0f0de9905cf40ec01')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
    
       <svg className="svg-contact" viewBox="0 0 960 300">
	<symbol id="s-text">
		<text text-anchor="middle" x="50%" y="80%">Any Issues?</text>
	</symbol>

	<g class = "g-ants">
		<use xlinkHref="#s-text" class="text-copy"></use>
		<use xlinkHref="#s-text" class="text-copy"></use>
		<use xlinkHref="#s-text" class="text-copy"></use>
		<use xlinkHref="#s-text" class="text-copy"></use>
		<use xlinkHref="#s-text" class="text-copy"></use>
	</g>
</svg>
      <form
      
        className="row"
        style={{ margin: "70px 25% 75px 25%", }}
        onSubmit={sendEmail}
      >
        <label>Name</label>
        <input type="text" name="name" className="form-control" value={localStorage.getItem('UserName')}/>
        <label>Email</label>
        <input type="text" name="user_email" className="form-control" value={localStorage.getItem('Email')}/>
        <label>Issues</label>
        <textarea name="message" rows="4" className="form-control" />
        <input
          type="submit"
          value="Send"
          className="form-control btn btn-primary"
          style={{ marginTop: "30px" }}
        />
      </form>
    </div>
  );
};

export default Mailer;
