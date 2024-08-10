import { themes } from '$lib/themes';

// TODO: replace any with proper types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handle = async ({ event, resolve }: any) => {
  const theme = event.cookies.get('theme');

  if (!theme || !themes.includes(theme)) {
    return await resolve(event);
  }

  return await resolve(event, {
    transformPageChunk: ({ html }: { html: string }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    }
  });
};
