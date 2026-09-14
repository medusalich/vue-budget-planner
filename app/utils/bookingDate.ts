export function mayBeBookedOn(bookedOn: string, today: string): boolean {
  return bookedOn <= today;
}

export function formatIsoDateAsGermanDate(bookedOn: string) {
  return bookedOn.split('-').reverse().join('.');
}

export function formatDateAsIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
