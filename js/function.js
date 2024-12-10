function parseTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function isMeetingInWorkHours(startWork, endWork, startMeeting, duration) {
    const startWorkMinutes = parseTime(startWork);
    const endWorkMinutes = parseTime(endWork);
    const startMeetingMinutes = parseTime(startMeeting);
    const endMeetingMinutes = startMeetingMinutes + duration;
  
    return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
  }
  
  // Пример использования:
  console.log(isMeetingInWorkHours('08:00', '17:30', '14:00', 90)); // true
  console.log(isMeetingInWorkHours('8:0', '10:0', '8:0', 120));     // true
  console.log(isMeetingInWorkHours('08:00', '14:30', '14:00', 90)); // false
  console.log(isMeetingInWorkHours('14:00', '17:30', '08:0', 90));  // false
  console.log(isMeetingInWorkHours('8:00', '17:30', '08:00', 900)); // false
  
  export { isMeetingInWorkHours };  