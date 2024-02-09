export function parseValue<T>(input: HTMLInputElement | HTMLTextAreaElement): T {
  const { value, type } = input;

  const types = {
    number: Number.isNaN(parseFloat(value)) ? null : parseFloat(value),
    text: value,
    checkbox: (input as HTMLInputElement).checked,
    date: value, // TODO: parse to Date
    email: value,
    month: value, // TODO: parse to Date
    password: value,
    search: value,
    tel: value,
    time: value, // TODO: parse to Date
    url: value,
    textarea: value,
    radio: value,
  };

  return types[type as keyof typeof types] as T;
}

export function hasArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}
