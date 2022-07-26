import {IsTextComponent} from "../../layout/Left";
import {useCanvasByContext} from "../../store/hooks";
import {defaultCommonStyle} from "../../utils/const";
import styles from "./index.less";

const defaultStyle = {
  ...defaultCommonStyle,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
};

const settings = [
  {
    value: "标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "正文",
    style: defaultStyle,
  },
];

export function TextSide() {
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
            onClick={() => addCmp({...item, type: IsTextComponent})}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}