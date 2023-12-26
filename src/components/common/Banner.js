import Image from 'next/image'

const Banner = ({Img, Title, Para}) => {
  return (
    <div className="common-banner-sec" >
    <Image src={Img} alt='altImg' />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-content">
              <h2>{Title}</h2>
              <span>{Para}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner