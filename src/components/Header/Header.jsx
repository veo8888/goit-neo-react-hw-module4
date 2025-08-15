import clsx from 'clsx';
import styles from './Header.module.css';

function Header({ theme }) {
  return (
    <header
      className={clsx(
        styles.header,
        theme === 'dark' ? styles.dark : styles.light
      )}
    >
      <nav className={styles.nav}>
        <p>
          <a className={styles.title} href="#">
            HOMEWORK-04
          </a>
        </p>
      </nav>
    </header>
  );
}

export default Header;
