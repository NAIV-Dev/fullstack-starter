export function maskThree(s: string) {
  return s.length <= 6 ? s : s.slice(0,3) + '*'.repeat(s.length - 6) + s.slice(-3);
}
