import {
  useState,
  PropsWithChildren,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { ButtonSC } from '../../styles/ButtonSC';

import { DropdownContentSC, DropdownWrapSC } from '../../styles/DropdownSC';

type DropdownType = {
  label?: ReactNode;
};

const Dropdown = ({
  label = null,
  children,
}: PropsWithChildren<DropdownType>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const ddWrapRef = useRef<HTMLElement>();

  // Handle outside click
  useEffect(() => {
    if (!ddWrapRef?.current || !isOpen) return;

    console.log('testtttttttttttt');

    function handleClickOutside(e: MouseEvent): void {
      if (
        e.target instanceof HTMLElement &&
        ddWrapRef.current &&
        !ddWrapRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ddWrapRef, isOpen]);

  return (
    <DropdownWrapSC isOpen={isOpen} ref={ddWrapRef as any}>
      <ButtonSC type="button" primary={isOpen} onClick={toggleOpen}>
        {label}
      </ButtonSC>

      <DropdownContentSC isOpen={isOpen}>{children}</DropdownContentSC>
    </DropdownWrapSC>
  );
};

export default Dropdown;
