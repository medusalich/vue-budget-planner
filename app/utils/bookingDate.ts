export function mayBeBookedOn(bookedOn: string, today: string): boolean {
  return bookedOn <= today;
}
