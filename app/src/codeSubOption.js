export function isCodeSubOption(code) {
  return code.length === 4 && code.slice(-1) === "P";
}
