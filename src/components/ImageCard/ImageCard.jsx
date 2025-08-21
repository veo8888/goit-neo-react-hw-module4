import css from './ImageCard.module.css';

export default function ImageCard({ data, onClick }) {
  const small = data.urls?.small;
  const alt = data.alt_description || data.description || 'Photo';
  const likes = data.likes ?? 0;

  return (
    <div
      className={css.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className={css.thumb}>
        <img className={css.img} src={small} alt={alt} loading="lazy" />
      </div>

      <div className={css.meta}>
        <span className={css.label}>Likes</span>
        <span>{likes}</span>
      </div>
    </div>
  );
}
