import React, { Component } from 'react';
import cls from 'classnames';

import styles from './index.less';
import { CanvasContext } from '../../Context';
export default class index extends Component {
  static contextType = CanvasContext;

  onDragStart = (e) => {
    this.setSelected();
    
    const startX = e.pageX;
    const startY = e.pageY;

    e.dataTransfer.setData('text', `${startX},${startY}`);
  };

  setSelected = () => {
    const { index } = this.props;
    this.context.setSelectedCmpIndex(index);
  };

  render() {
    const { cmp, selected } = this.props;
    const { style, value } = cmp;

    return (
      <div
        className={styles.main}
        draggable="true"
        onDragStart={this.onDragStart}
        onClick={this.setSelected}
      >
        {/* 组件本身 */}
        <div className={style.cmp} style={style}>
          {value}
        </div>

        {/* 组件的功能、选种样式 */}
        <div
          className={cls(
            styles.editStyle,
            selected ? styles.selected : styles.unselected
          )}
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
}
