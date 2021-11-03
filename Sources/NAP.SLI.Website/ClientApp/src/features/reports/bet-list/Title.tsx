import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Spinner } from 'reactstrap';
import { excel } from './reducer';

const Title = () => {
  const { queryArg, queryCustomer } = useSelector(
    (state: AppState) => state.betList,
  );
  const [isLoading, setIsLoading] = useState(false);

  if (!queryCustomer) return <></>;
  const { username, custId, roleId } = queryCustomer;
  const { fromDate, toDate } = queryArg;

  const handleExcel = async () => {
    const excelPayload = {
      custId,
      roleId,
      username,
      fromDate,
      toDate,
    };
    setIsLoading(true);
    await excel(excelPayload);
    setIsLoading(false);
  };

  return (
    <>
      <div className="page-title">
        MEMBER BET LIST {fromDate} --&gt; {toDate} - {username}
        <Button
          type="button"
          color="success"
          className="btn-excel float-right"
          title="Export to Excel"
          onClick={handleExcel}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner data-testid="excel-loading" />
          ) : (
            <Icon path={mdiFileExcelOutline} />
          )}
        </Button>
      </div>
    </>
  );
};

export default Title;
