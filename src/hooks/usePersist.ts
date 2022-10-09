import { useState, useEffect } from 'react';

// Preserves the logged in state on refresh
const usePersist = () => {
  const [persist, setPersist] = useState(
    // JSON.parse(localStorage.getItem('persist') as string) || false,
    true,
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;

// TODO: Maybe remove this hook if it's left unused
