type Browser = 'ie' | 'edge' | 'chrome' | 'firefox' | 'safari';

type BrowserInfo = {
  browser: Browser;
  version: string;
};

export function getBrowserInfo(): BrowserInfo | null {
  if (typeof navigator === 'undefined' || !navigator) {
    return null;
  }

  // NOTE: The order matters here!
  const browserPatterns = [
    { key: 'edge' as const, pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'ie' as const, pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    {
      key: 'ie' as const,
      // eslint-disable-next-line no-useless-escape
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'chrome' as const,
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'firefox' as const,
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'safari' as const,
      pattern:
        /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/,
    },
  ];

  // Find the FIRST matching browser
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;

      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }

  return null;
}

export const isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== 'undefined' &&
    // @ts-ignore
    typeof window.document !== 'undefined' &&
    // @ts-ignore
    typeof navigator !== 'undefined'
  );
};
