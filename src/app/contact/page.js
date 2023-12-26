import "@/app/styles/style.css"
import Banner from '@/components/common/Banner'
import { FaPaperPlane } from "react-icons/fa";
import img from '../../../public/assets/images/about-us-page-heading.jpg'
import SubscribeSec from "@/components/home/SubscribeSec";
import Modal from "@/components/common/CommonModal";

const Contact = () => {
  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Contact Us"}
        Para={"Men's Grooming Mascumen Products"}
      />

      <div className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 my-2">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90186.37207676383!2d-80.13495239500924!3d25.9317678710111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad1877e4a82d%3A0xa891714787d1fb5e!2sPier%20Park!5e1!3m2!1sen!2sth!4v1637512439384!5m2!1sen!2sth"
                  width="100%" height="400px" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-6 my-2">
              <div className="pb-5">
                <h2 className="section-heading">Say Hello. Don't Be Shy!</h2>
                <span className="section-para">Details to details is what makes Mascumen different from the others.</span>
              </div>
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-6 my-2">
                    <fieldset>
                      <input name="name" type="text" id="name" placeholder="Your name" required="" />
                    </fieldset>
                  </div>
                  <div className="col-lg-6 my-2">
                    <fieldset>
                      <input name="email" type="text" id="email" placeholder="Your email" required="" />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" rows="6" id="message" placeholder="Your message" required=""></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-dark-button"><FaPaperPlane /></button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* -- subscribe sec -- */}
      <SubscribeSec />



      <Modal />
    </>
  )
}

export default Contact