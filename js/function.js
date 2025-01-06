const parseTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInWorkHours = (startWork, endWork, startMeeting, duration) => {
  const startWorkMinutes = parseTime(startWork);
  const endWorkMinutes = parseTime(endWork);
  const startMeetingMinutes = parseTime(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};

export { isMeetingInWorkHours };