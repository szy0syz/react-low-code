import React from 'react';
import cls from 'classnames';

import styles from './index.less';

export function Cmp({ cmp }) {
  const { style, value } = cmp;

  return (
    <div className={styles.main}>
      {/* 组件本身 */}
      <div className={style.cmp} style={style}>
        {value}
      </div>

      {/* 组件的功能、选种样式 */}
      <div
        className={cls(styles.editStyle, styles.selected)}
        style={{
          top: style.top - 2,
          left: style.left - 2,
          width: style.width,
          height: style.height,
        }}
      ></div>
    </div>
  );
}
