import { PropsWithChildren, ReactNode } from 'react';
import { PageWrapSC } from '../../styles/PageWrapSC';

type PageProps = {
  pageTitle?: ReactNode | string | undefined;
} & PropsWithChildren;

const PageWrap = ({ children, pageTitle = undefined }: PageProps) => {
  return (
    <PageWrapSC>
      {pageTitle ? <h2>{pageTitle}</h2> : null}

      {children}
    </PageWrapSC>
  );
};

export default PageWrap;
