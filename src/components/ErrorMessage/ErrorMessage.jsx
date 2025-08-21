import css from './ErrorMessage.module.css';

export default function ErrorMessage({
  text = 'Oops... Failed to load images. Try again.',
}) {
  return <div className={css.box}>{text}</div>;
}
