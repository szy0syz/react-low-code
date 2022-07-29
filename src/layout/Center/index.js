import { useCallback } from 'react';
import styles from './index.less';
import { useCanvasByContext } from '../../store/hooks';
import Cmp from '../../components/Cmp';

export default function Center(props) {
  const canvas = useCanvasByContext();
  const canvasData = canvas.getCanvas();

  const { style, cmps } = canvasData;

  const onDrop = useCallback((e) => {
    const endX = e.pageX;
    const endY = e.pageY;

    const start =e.dataTransfer.getData('text').split(',');

    const disX = endX - start[0];
    const disY = endY - start[1];

    const selectedCmp = canvas.getSelectedCmp();

    const oldStyle = selectedCmp.style;

    const top = oldStyle.top + disY;
    const left = oldStyle.left + disX;

    canvas.updateSelectedCmp({top, left});
  }, []);

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.canvas} onDrop={onDrop} onDragOver={allowDrop}>
        {cmps.map((cmp) => (
          <Cmp key={cmp.key} cmp={cmp} />
        ))}
      </div>
    </div>
  );
}
