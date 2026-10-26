export function formatCurrency(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString('en-PK', {
    maximumFractionDigits: 0,
  })}`
}
