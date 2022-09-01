export function obfuscateSearchParams(searchParams) {
  const obfuscated = btoa(searchParams);
  return `token=${obfuscated}`;
}

function isAscii(str, extended) {
  /* eslint-disable-next-line no-control-regex */
  return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

export function deobfuscateSearchParams(obfuscated) {
  try {
    const searchParams = atob(obfuscated);
    if (!isAscii(searchParams)) {
      return {};
    }
    return new Proxy(new URLSearchParams(searchParams), {
      get: (searchParams, prop) => searchParams.get(prop) || "",
    });
  } catch (_) {
    return {};
  }
}
