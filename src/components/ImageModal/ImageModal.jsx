import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({
  isOpen,
  onRequestClose,
  images,
  currentIndex,
  goPrev,
  goNext,
}) {
  const item = images?.[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handler = e => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onRequestClose();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, goPrev, goNext, onRequestClose]);

  if (!item) return null;

  const big = item.urls?.regular || item.urls?.full || item.urls?.small;
  const alt = item.alt_description || item.description || 'Photo';
  const caption =
    item.description ||
    item.alt_description ||
    (item.user ? `Photo by ${item.user.name}` : '');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.content}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick
    >
      <button className={css.close} onClick={onRequestClose} aria-label="Close">
        <FaTimes />
      </button>

      <div className={css.stage}>
        <button className={css.navBtn} onClick={goPrev} aria-label="Previous">
          <FaChevronLeft />
        </button>

        <img className={css.image} src={big} alt={alt} />

        <button className={css.navBtn} onClick={goNext} aria-label="Next">
          <FaChevronRight />
        </button>
      </div>

      {caption && <div className={css.caption}>{caption}</div>}
    </Modal>
  );
}
