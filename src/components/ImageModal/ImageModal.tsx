import Modal from "react-modal";
import "./ImageModal.module.css";
import { PhotoData } from "../../types";
import { FC } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  modalPhoto: PhotoData | null;
}

const ImageModal: FC<ImageModalProps> = ({
  isModalOpen,
  closeModal,
  modalPhoto,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {modalPhoto && (
        <img
          src={modalPhoto.urls?.regular}
          alt={modalPhoto.alternative_slugs?.en}
        />
      )}
    </Modal>
  );
};
export default ImageModal;
