import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ handleClick, item }) => {
  const { webformatURL, tags } = item;

  return (
    <li className={css.ImageGalleryItem} onClick={() => handleClick(item)}>
      <img
        className={css['ImageGalleryItem-image']}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};
