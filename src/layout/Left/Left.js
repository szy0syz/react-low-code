import {useState, useEffect} from "react";
import cls from 'classnames';

import styles from './index.less';
import { TextSide } from '../../components/TextSide';
import { ImgSide } from '../../components/ImgSide';


export const IsTextComponent = 1;
export const IsImgComponent = 2;

export function Left(props) {
  const [showSide, setShowSide] = useState(0);

  const _setShowSide = (which) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which);
    }
  };

  useEffect(() => {
    document.getElementById("center").addEventListener("click", () => {
      setShowSide(0);
    });
  }, []);

  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li
          className={cls(
            styles.cmp,
            showSide === IsTextComponent ? styles.selected : ''
          )}
          onClick={() => _setShowSide(IsTextComponent)}
        >
          <span>文本</span>
        </li>
        <li
          className={cls(
            styles.cmp,
            showSide === IsImgComponent ? styles.selected : ''
          )}
          onClick={() => _setShowSide(IsImgComponent)}
        >
          <span>图片</span>
        </li>
      </ul>

      {showSide === IsTextComponent && <TextSide />}
      {showSide === IsImgComponent && <ImgSide />}
    </div>
  );
}
