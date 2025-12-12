/**
 * Extracts the YouTube Video ID from various URL formats.
 * Supports: standard, short (youtu.be), embed, etc.
 */
export const getYoutubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generates the thumbnail URL for a given YouTube ID.
 */
export const getThumbnailUrl = (youtubeId: string): string => {
  // hqdefault is a good balance of quality and availability
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
};