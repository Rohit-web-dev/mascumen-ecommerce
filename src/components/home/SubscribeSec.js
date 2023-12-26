import Link from 'next/link'
import { FaPaperPlane } from "react-icons/fa";

const SubscribeSec = () => {
  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 my-2">
            <h2 class="section-heading">By Subscribing To Our Newsletter You Can Get 30% Off</h2>
            <p class="section-para">Details to details is what makes mascumen different from the others.</p>
            <form id="subscribe" action="" method="get">
              <div className="row">
                <div className="col-lg-5 my-2">
                  <fieldset>
                    <input name="name" type="text" id="name" placeholder="Your Name" required="" />
                  </fieldset>
                </div>
                <div className="col-lg-5 my-2">
                  <fieldset>
                    <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email Address"
                      required="" />
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button type="submit" id="form-submit" className="main-dark-button my-2"><FaPaperPlane className="plan-ico" /></button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 my-2">
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>Store Location:<br /><span>Sunny Isles Beach, FL 33160, United States</span></li>
                  <li>Phone:<br /><span>010-020-0340</span></li>
                  <li>Office Location:<br /><span>North Miami Beach</span></li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>Work Hours:<br /><span>07:30 AM - 9:30 PM Daily</span></li>
                  <li>Email:<br /><span>info@company.com</span></li>
                  <li>Social Media:<br /><span><Link href="#">Facebook</Link>, <Link href="#">Instagram</Link>, <Link href="#">Behance</Link>,
                    <Link href="#">Linkedin</Link></span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeSec