export function getSessionState<T>(key: string): T | undefined {
  let result: T | undefined = undefined;
  const stringValue: string | null = sessionStorage.getItem(key);
  if (stringValue) {
    try {
      result = JSON.parse(stringValue);
    } catch (e: any) {
      console.error(
        `Error reading session storage ${key}. ${e.message}`,
      );
    }
  }
  return result;
}

export function setSessionState(key: string, val: any): void {
  sessionStorage.setItem(key, JSON.stringify(val));
}

export function delSessionState(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearSessionState(): void {
  sessionStorage.clear();
}

export function getLocalState<T>(key: string): T | undefined {
  let result: T | undefined = undefined;
  const stringValue: string | null = localStorage.getItem(key);
  if (stringValue) {
    try {
      result = JSON.parse(stringValue);
    } catch (e: any) {
      console.error(
        `Error reading local storage ${key}. ${e.message}`,
      );
    }
  }
  return result;
}

export function setLocalState(key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val));
}

export function delLocalState(key: string): void {
  localStorage.removeItem(key);
}
