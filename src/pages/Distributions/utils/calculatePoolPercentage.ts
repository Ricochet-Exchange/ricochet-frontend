import Decimal from 'decimal.js';

const calculatePoolPercentage = (
  indexTotalUnits: Decimal,
  indexSubscriptionUnits: Decimal,
): Decimal => {
  if (indexTotalUnits.isZero() || indexSubscriptionUnits.isZero()) {
    return new Decimal(0);
  }

  return indexSubscriptionUnits.div(indexTotalUnits).mul(100);
};

export default calculatePoolPercentage;
