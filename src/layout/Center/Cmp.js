import React from 'react';

export function Cmp({ cmp }) {
  const { style, value } = cmp;
  
  return (
    <div className={style.cmp} style={style}>
      {value}
    </div>
  );
}
