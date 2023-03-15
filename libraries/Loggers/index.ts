export function logInfo(label: string, data: any) {
  console.log({
    label,
    data,
  });
}

export function logError(label: string, data: any, error: unknown) {
  console.error({
    label,
    data,
    error,
  });
}
