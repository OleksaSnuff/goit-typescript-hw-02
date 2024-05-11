import { FC } from "react";
import { PhotoData } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  photoData: PhotoData[];
  onClick: (photo: PhotoData) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ photoData, onClick }) => {
  return (
    <ul className={css.list}>
      {photoData.map((photo) => {
        return (
          <li key={photo.id}>
            <ImageCard photo={photo} onClick={() => onClick(photo)} />
          </li>
        );
      })}
    </ul>
  );
};
export default ImageGallery;
