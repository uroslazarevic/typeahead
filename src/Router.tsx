import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('modules/home/Home'));

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
