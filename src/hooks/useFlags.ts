export const useFlags = (flag: any) => {
  const flagUrl = `https://wise.com/public-resources/assets/flags/rectangle/${flag.toLowerCase()}.png`

  return { flagUrl }
}
