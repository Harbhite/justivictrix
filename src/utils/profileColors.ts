
export const profileColors = [
  'from-purple-400 to-pink-400',
  'from-blue-400 to-cyan-400',
  'from-green-400 to-emerald-400',
  'from-orange-400 to-amber-400',
  'from-pink-400 to-rose-400',
  'from-indigo-400 to-violet-400'
];

export const getProfileColor = (index: number): string => {
  return profileColors[index % profileColors.length];
};
