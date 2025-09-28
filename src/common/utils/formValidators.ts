export const required = (msg?: string) => (v: string) => (v ? undefined : msg || 'Required')
