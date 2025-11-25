// helper для жёсткой проверки наличия env-переменных
export function env(key: string): string {
const value = process.env[key];
if (typeof value === 'undefined' || value === '') {
throw new Error(`Missing env variable: ${key}`);
}
return value;
}


export function envOr(key: string, fallback: string): string {
const value = process.env[key];
return typeof value === 'undefined' || value === '' ? fallback : value;
}


export function envBool(key: string, fallback = false): boolean {
const raw = process.env[key];
if (typeof raw === 'undefined' || raw === '') return fallback;
return raw === 'true' || raw === '1';
}