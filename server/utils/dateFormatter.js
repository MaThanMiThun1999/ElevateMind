// dateFormatter.js
function formatTime(format = 'hh:mm A') {
  const now = new Date();

  // Get hours, minutes and AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  let formattedHours = hours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // The hour '0' should be '12'

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Construct time string based on the format
  let timeString = format
    .replace('hh', String(formattedHours).padStart(2, '0')) // Replace hours with leading zero
    .replace('mm', String(formattedMinutes).padStart(2, '0')) // Replace minutes with leading zero
    .replace('A', ampm); // Replace A with AM/PM

  return timeString;
}

// Usage:
// const formatTime = require('./timeUtils');

// // Example usage:
// console.log(formatTime()); // Default 'hh:mm A' format
// console.log(formatTime('hh:mm A')); // Custom format
// console.log(formatTime('hh:mm')); // Without AM/PM
// console.log(formatTime('hh:mm:ss A')); // With seconds


// Export the function to be used in other files
module.exports = formatTime;
