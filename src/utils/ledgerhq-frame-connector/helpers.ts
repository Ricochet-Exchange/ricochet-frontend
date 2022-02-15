export const isIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (error) {
    return false;
  }
};

export const isLedgerDappBrowserProvider = (() => {
  let state: boolean | null = null;

  return (): boolean => {
    if (typeof state === 'boolean') return state;
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.self.location.search);
      const isEmbed = !!params.get('embed');
      state = isIframe() && isEmbed;
    } catch (error) {
      state = false;
    }
    return !!state;
  };
})();
