import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './not-found/Page';
import UMPage from './UM/Page';

export const ErrorRoutes = () => {
  return (
    <Routes>
      <Route path="under-maintenance" element={<UMPage />} />
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
