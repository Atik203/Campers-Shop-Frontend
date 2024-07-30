/**
 * Convert a Stripe timestamp to a human-readable date string.
 * @param {number} stripeTimestamp - The Stripe timestamp (in seconds).
 * @returns {string} - The formatted date string (e.g., "YYYY-MM-DD HH:MM:SS").
 */
function convertStripeTimestamp(stripeTimestamp: number): string {
  // Convert to milliseconds
  const date: Date = new Date(stripeTimestamp * 1000);

  // Extract parts of the date
  const year: number = date.getFullYear();
  const month: string = ("0" + (date.getMonth() + 1)).slice(-2); // Zero-padding for single digit months
  const day: string = ("0" + date.getDate()).slice(-2); // Zero-padding for single digit days
  const hours: string = ("0" + date.getHours()).slice(-2); // Zero-padding for single digit hours
  const minutes: string = ("0" + date.getMinutes()).slice(-2); // Zero-padding for single digit minutes
  const seconds: string = ("0" + date.getSeconds()).slice(-2); // Zero-padding for single digit seconds

  // Format the date as desired
  const formattedDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

// Example usage
// const stripeTimestamp: number = 1722373754;
// const formattedDate: string = convertStripeTimestamp(stripeTimestamp);
// console.log(formattedDate); // Outputs the formatted date

export default convertStripeTimestamp;
