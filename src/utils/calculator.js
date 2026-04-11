export const calculateTipDetails = (bill, tipPercentage) => {
  const billAmount = parseFloat(bill);

  if (isNaN(billAmount) || billAmount <= 0) {
    return null;
  }

  const tipAmount = (billAmount * (tipPercentage / 100));
  const totalAmount = billAmount + tipAmount;

  return {
    tip: tipAmount.toFixed(2),
    total: totalAmount.toFixed(2)
  };
};