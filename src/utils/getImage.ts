export function getImage(key: string, from: string = 'cards', ext: string = 'png'): string {
  return `/${from}/${key}.${ext}`;
}