import { mdiFileExcelOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useAppDispatch } from 'app/store';
import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';

type Props = {
  content: string;
  handleExcel: () => Promise<void>;
};

const Title = ({ content, handleExcel }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const exportExcel = async () => {
    setIsLoading(true);
    await dispatch(async () => await handleExcel());
    setIsLoading(false);
  };

  return (
    <>
      <div className="page-title">
        {content}
        <Button
          type="button"
          color="success"
          className="btn-excel float-right"
          title="Export to Excel"
          onClick={exportExcel}
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
