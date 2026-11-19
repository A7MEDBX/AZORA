import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function Link({ href, to, children, ...props }: any) {
  const target = to || href || '/';
  return (
    <RouterLink to={target} {...props}>
      {children}
    </RouterLink>
  );
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}
