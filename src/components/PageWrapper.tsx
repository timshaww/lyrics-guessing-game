import { ReactNode } from 'react';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="bg-apple-bg-main max-w-screen-3xl no-scrollbar h-full w-full px-12 pt-48">{children}</div>;
};

export default PageWrapper;
