import { useState, useEffect } from 'react';

export const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState();
  const downHandler = ({ key }) => {
    key === targetKey ? setKeyPressed(true) : setKeyPressed(false);
  };
  const upHandler = ({ key }) => {
    key === targetKey && setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};
