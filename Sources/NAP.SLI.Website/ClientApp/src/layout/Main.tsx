import React, { PropsWithChildren } from 'react';
import { Container } from 'reactstrap';

type Props = PropsWithChildren<unknown>;

export const MainLayout = ({ children }: Props) => {
  return <Container fluid>{children}</Container>;
};
