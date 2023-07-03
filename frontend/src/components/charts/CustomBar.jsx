import React, { useState, useEffect } from 'react';

import '../../styles/chart.css'


const CustomBar = ({ fill, x, y, width, height }) => (
  <rect x={x} y={y} width={width} height={height} fill={fill} className="custom-bar" />
);

export default CustomBar