export function getErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  if (!error.response) {
    return 'Unable to Connect. Check your internet connection.';
  }

  return error.response.data?.message ?? 'Something went wrong.';
}
