export function isValidUrl(input: string) {
  // check is mock api
  if (input.startsWith('/api/mock/')) return true;

  try {
    new URL(input);

    return true;
  } catch (err) {
    return false;
  }
}
