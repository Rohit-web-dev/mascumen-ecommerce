import { Modal, Button } from 'react-bootstrap';

const CommonModal = ({ showModal, handleClose, modalTitle, modalBody }) => {
  return (
    <>
      <Modal show={showModal} onHide={handleClose} className='modal-xl'>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default CommonModal