import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.jsx';

export default function ImageGallery({ images, onImageClick }) {
  if (!images || images.length === 0) return null;

  return (
    <ul className={css.grid}>
      {images.map((img, idx) => (
        <li key={img.id} className={css.item}>
          <ImageCard data={img} onClick={() => onImageClick(idx)} />
        </li>
      ))}
    </ul>
  );
}
