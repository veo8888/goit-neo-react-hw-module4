import CircleLoader from 'react-spinners/CircleLoader';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrap} role="status" aria-live="polite">
      <CircleLoader color="gold" size={44} />
    </div>
  );
}
