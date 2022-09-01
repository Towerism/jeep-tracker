export function obfuscateSearchParams(searchParams) {
  const obfuscated = btoa(searchParams);
  return `token=${obfuscated}`;
}

export function deobfuscateSearchParams(obfuscated) {
  try {
    const searchParams = atob(obfuscated);
    return new Proxy(new URLSearchParams(searchParams), {
      get: (searchParams, prop) => searchParams.get(prop) || "",
    });
  } catch (_) {
    return {};
  }
}
