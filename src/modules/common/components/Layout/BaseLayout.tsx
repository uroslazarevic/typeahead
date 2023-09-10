import React from 'react';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-300 h-full w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default BaseLayout;
