import { IsImgComponent } from "../../layout/Left/Left";
import { useCanvasByContext } from "../../store/hooks";
import styles from "./index.less";

const defaultStyle = {
  position: "absolute",
  top: 1,
  left: 0,
  width: 80,
  height: 80,
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
};

const settings = [
  {
    value: "http://150.158.30.131:8181/certificate.jpg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/chuliu.jpeg",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/tiger.png",
    style: defaultStyle,
  },
  {
    value: "http://150.158.30.131:8181/hua.png",
    style: defaultStyle,
  },
];

export function ImgSide() {
  const canvas = useCanvasByContext();
  const addCmp = (_cmp) => {
    canvas.addCmp(_cmp);
  };
  
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            key={item.value}
            className={styles.item}
            onClick={() => addCmp({ ...item, type: IsImgComponent })}
          >
            <img src={item.value} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}