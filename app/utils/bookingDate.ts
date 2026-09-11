export function mayBeBookedOn(bookedOn: string, today: string): boolean {
  return bookedOn <= today;
}

export function formatIsoDateAsGermanDate(bookedOn: string) {
  return bookedOn.split('-').reverse().join('.');
}
