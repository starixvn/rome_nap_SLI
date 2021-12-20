import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { BrowserHistory } from 'react-router/node_modules/history';

export const CustomRouter = ({
  history,
  children,
}: PropsWithChildren<{ history: BrowserHistory }>) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
};
