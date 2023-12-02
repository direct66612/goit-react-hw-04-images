import css from './Button.module.css';

export const Button = ({ handleClick }) => {
  return (
    <button className={css.Button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
};
