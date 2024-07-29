import React from 'react';

type HintProps = {
  text: string;
};

const Hint: React.FC<HintProps> = ({ text }) => <span className="base-hint">{text}</span>;

export default Hint;
