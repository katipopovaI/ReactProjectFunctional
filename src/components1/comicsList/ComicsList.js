import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [ComicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllcomics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    getAllcomics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.lenght < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);

    setnewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(ComicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemLoading}
        style={{ display: setComicsEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

// const ComicsList = () => {
//   return (
//     <div className="comics__list">
//       <ul className="comics__grid">
//         <li className="comics__item">
//           <a href="#">
//             <img src={uw} alt="ultimate war" className="comics__item-img" />
//             <div className="comics__item-name">
//               ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
//             </div>
//             <div className="comics__item-price">9.99$</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={xMen} alt="x-men" className="comics__item-img" />
//             <div className="comics__item-name">X-Men: Days of Future Past</div>
//             <div className="comics__item-price">NOT AVAILABLE</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={uw} alt="ultimate war" className="comics__item-img" />
//             <div className="comics__item-name">
//               ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
//             </div>
//             <div className="comics__item-price">9.99$</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={xMen} alt="x-men" className="comics__item-img" />
//             <div className="comics__item-name">X-Men: Days of Future Past</div>
//             <div className="comics__item-price">NOT AVAILABLE</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={uw} alt="ultimate war" className="comics__item-img" />
//             <div className="comics__item-name">
//               ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
//             </div>
//             <div className="comics__item-price">9.99$</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={xMen} alt="x-men" className="comics__item-img" />
//             <div className="comics__item-name">X-Men: Days of Future Past</div>
//             <div className="comics__item-price">NOT AVAILABLE</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={uw} alt="ultimate war" className="comics__item-img" />
//             <div className="comics__item-name">
//               ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
//             </div>
//             <div className="comics__item-price">9.99$</div>
//           </a>
//         </li>
//         <li className="comics__item">
//           <a href="#">
//             <img src={xMen} alt="x-men" className="comics__item-img" />
//             <div className="comics__item-name">X-Men: Days of Future Past</div>
//             <div className="comics__item-price">NOT AVAILABLE</div>
//           </a>
//         </li>
//       </ul>
//       <button className="button button__main button__long">
//         <div className="inner">load more</div>
//       </button>
//     </div>
//   );
// };

// export default ComicsList;
