import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './not-found/Page';

export const ErrorRoutes = () => {
  return (
    <Routes>
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
