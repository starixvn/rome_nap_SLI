import React from 'react';
import { useSelector } from 'react-redux';
import Filter from './Filter';
import NumberGameTable from './NumberGameTable';
import Happy5Table from './Happy5Table';

const ResultsPage = () => {
  const { sport } = useSelector((state: AppState) => state.results);

  return (
    <div className="result-page">
      <div className="page-title">Results</div>
      <Filter />
      {sport === 'NumberGame' ? <NumberGameTable /> : <Happy5Table />}
    </div>
  );
};

export default ResultsPage;
