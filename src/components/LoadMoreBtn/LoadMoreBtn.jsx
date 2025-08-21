import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.wrap}>
      <button type="button" className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
