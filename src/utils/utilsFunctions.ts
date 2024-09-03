export function validateAndFormatDateTime(dateString: string | undefined) {
  if (!dateString) {
    return {
      isValid: false,
      dateForInput: dateString,
    };
  }

  const date = new Date(dateString);

  if (date.toString() === "Invalid Date") {
    return {
      isValid: false,
      dateForInput: dateString,
    };
  }

  const dateForInput = date.toISOString().slice(0, 16);

  return {
    isValid: true,
    dateForInput: dateForInput,
  };
}
