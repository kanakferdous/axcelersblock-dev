export function generateUniqueClass(blockName) {
  const timestamp = Date.now().toString(36);
  const randomId = Math.random().toString(36).substr(2, 5);
  return `${blockName}-${timestamp}-${randomId}`;
}
