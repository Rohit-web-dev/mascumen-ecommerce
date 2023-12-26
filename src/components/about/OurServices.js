import "@/app/styles/style.css"
import Image from "next/image"
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'

const data = [
  {
    id: 1,
    img: img1,
    title: "Synther Vaporware",
    desc: 'Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp incididunt ut labore, et dolore quis ipsum suspend.'
  },
  {
    id: 2,
    img: img2,
    title: "Locavore Squidward",
    desc: 'Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp incididunt ut labore, et dolore quis ipsum suspend.'
  },
  {
    id: 3,
    img: img3,
    title: "Health Gothfam",
    desc: 'Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp incididunt ut labore, et dolore quis ipsum suspend.'
  },
]

const OurServices = () => {
  return (
    <section className="our-services">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 my-2">
            <div className="text-center pb-5">
              <h2 className='section-heading'>Our Services</h2>
              <span className='section-para'>Details to details is what makes Mascumen different from the others.</span>
            </div>
          </div>
          {
            data.map((item) => (
              <div className="col-lg-4 col-md-6 my-2">
                <div className="service-item">
                  <h4>{item?.title}</h4>
                  <p>{item?.desc}</p>
                  <Image src={item?.img} alt={item?.title} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default OurServices