import Image from 'next/image'
import img from '../../../public/assets/images/empty.png'

const EmptyPage = () => {
  return (
    <>
      <div className="empty-state">
        <div className="empty-state__content">
          <div className="empty-state__icon">
            <Image src={img} alt='img' />
          </div>
          <div className="empty-state__message">No records has been added yet.</div>
        </div>
      </div>
    </>
  )
}

export default EmptyPage