import { FC } from "react";
import { PhotoData } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  photo: PhotoData;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ photo, onClick }) => {
  return (
    <div className={css.image}>
      <img
        src={photo.urls.small}
        alt={photo.alternative_slugs.en}
        onClick={onClick}
        className={css.photo}
      />
    </div>
  );
};
export default ImageCard;
