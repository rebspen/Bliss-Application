import React from 'react';

import { Link } from 'react-router-dom';

export default function Question(value) {
  return (
    <div>
      <p>{value.id}</p>
      <p>{value.question}</p>
    </div>
   
  );
}