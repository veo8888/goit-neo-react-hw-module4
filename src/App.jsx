import Header from './components/Header/Header';

import styles from './App.module.css';

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.conteiner}>
        <h1>Place to perform the task</h1>
        <hr />
        <h2>Other tasks</h2>
      </div>
    </>
  );
};

export default App;
