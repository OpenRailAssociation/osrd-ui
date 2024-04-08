import React, { FC } from 'react';

const Loader: FC = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
