export const calculateHours = (timeIn: string, timeOut: string, breakMins: string): number => {
  if (!timeIn || !timeOut) return 0;
  
  const [inH, inM] = timeIn.split(':').map(Number);
  const [outH, outM] = timeOut.split(':').map(Number);
  const startMinutes = inH * 60 + inM;
  const endMinutes = outH * 60 + outM;
  const totalMinutes = endMinutes - startMinutes - (parseInt(breakMins) || 0);
  
  return Math.max(0, totalMinutes / 60);
};

export const getWeekSummary = (entries: any[]): number => {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const thisWeekEntries = entries.filter(e => {
    const entryDate = new Date(e.date);
    return entryDate >= weekStart;
  });
  
  return thisWeekEntries.reduce((sum, e) => sum + parseFloat(e.hours), 0);
};

export const getTotalHours = (entries: any[]): number => {
  return entries.reduce((sum, entry) => sum + parseFloat(entry.hours || 0), 0);
};


