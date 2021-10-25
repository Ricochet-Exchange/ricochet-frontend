import React, { useEffect, useMemo } from 'react';

type Props = {
  update: () => void;
  deps?: any[];
  delay?: number;
};

export const PopperUpdater: React.FC<Props> = ({
  deps, update, children, delay = 0,
}) => {
  const dependencies = useMemo(() => (deps || []), [deps]);

  useEffect(() => {
    if (!delay) {
      update();
      return;
    }
    const timer = setTimeout(() => update(), delay);
    return () => clearTimeout(timer);
  }, dependencies);
  return <>{children}</>;
};
