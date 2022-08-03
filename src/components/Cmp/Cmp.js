import React, { Component } from 'react';
import cls from 'classnames';

import styles from './index.less';
import { CanvasContext } from '../../Context';
import { IsTextComponent, IsImgComponent } from '../../layout/Left';
import { Text } from '../Text';
import { Img } from '../Img';

export class Cmp extends Component {
  static contextType = CanvasContext;

  onDragStart = (e) => {
    this.setSelected(e);

    const startX = e.pageX;
    const startY = e.pageY;

    e.dataTransfer.setData('text', `${startX},${startY}`);
  };

  setSelected = (e) => {
    e.stopPropagation();
    const { index } = this.props;
    this.context.setSelectedCmpIndex(index);
  };

  // 伸缩组件 style top left width height
  onMouseDown = (e) => {
    const direction = e.target.dataset.direction;
    if (!direction) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const { cmp } = this.props;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      // style top left width height
      let newStyle = {};
      // todo top left
      if (direction) {
        if (direction.indexOf('top') >= 0) {
          disY = 0 - disY;
          newStyle.top = cmp.style.top - disY;
        }

        if (direction.indexOf('left') >= 0) {
          disX = 0 - disX;
          newStyle.left = cmp.style.left - disX;
        }
      }

      Object.assign(newStyle, {
        width: cmp.style.width + disX,
        height: cmp.style.height + disY,
      });

      this.context.updateSelectedCmp(newStyle);

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { style } = this.props.cmp;
    const { height, transform } = style;
    const trans = parseFloat(transform);

    const r = height / 2;

    const ang = ((trans + 90) * Math.PI) / 180;

    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];

    let startX = e.pageX + offsetX;
    let startY = e.pageY + offsetY;

    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      let deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI) - 90;

      deg = deg.toFixed(2);

      this.context.updateSelectedCmp({
        transform: deg,
      });
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  render() {
    const { cmp, selected } = this.props;
    const { style } = cmp;

    const { width, height } = style;
    const transform = `rotate(${style.transform}deg)`;

    return (
      <div
        className={styles.main}
        draggable="true"
        onDragStart={this.onDragStart}
        onClick={this.setSelected}
      >
        {/* 组件本身 */}
        <div className={style.cmp} style={{ ...style, transform }}>
          {getCmp(cmp)}
        </div>

        {/* 组件的功能、选种样式 */}
        <ul
          className={cls(
            styles.editStyle,
            selected ? styles.selected : styles.unselected
          )}
          style={{
            top: style.top - 2,
            left: style.left - 2,
            width: style.width,
            height: style.height,
            transform,
          }}
          onMouseDown={this.onMouseDown}
        >
          <li
            className={styles.stretchDot}
            style={{ top: -8, left: -8 }}
            data-direction="top, left"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: -8,
              left: width / 2 - 8,
            }}
            data-direction="top"
          />

          <li
            className={styles.stretchDot}
            style={{ top: -8, left: width - 8 }}
            data-direction="top right"
          />

          <li
            className={styles.stretchDot}
            style={{ top: height / 2 - 8, left: width - 8 }}
            data-direction="right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width - 8,
            }}
            data-direction="bottom right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width / 2 - 8,
            }}
            data-direction="bottom"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: -8,
            }}
            data-direction="bottom left"
          />
          <li
            className={styles.stretchDot}
            style={{
              top: height / 2 - 8,
              left: -8,
            }}
            data-direction="left"
          />

          <li
            className={cls(styles.rotate, 'iconfont icon-xuanzhuan')}
            style={{
              top: height + 12,
              left: width / 2 - 12,
            }}
            onMouseDown={this.rotate}
          />
        </ul>
      </div>
    );
  }
}

function getCmp(cmp) {
  switch (cmp.type) {
    case IsTextComponent:
      return <Text {...cmp} />;
    case IsImgComponent:
      return <Img {...cmp} />;
    default:
      break;
  }
}
