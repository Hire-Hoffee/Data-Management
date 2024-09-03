export function validateAndFormatDateTime(dateString: string) {
  const date = new Date(dateString);

  if (date.toString() === "Invalid Date") {
    return {
      isValid: false,
      dateForInput: null,
    };
  }

  const dateForInput = date.toISOString().slice(0, 16);

  return {
    isValid: true,
    dateForInput: dateForInput,
  };
}
