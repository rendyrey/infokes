export const successResponse = (data: any, message = "Success", status = 200) => {
  return new Response(JSON.stringify({ success: true, message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

export const errorResponse = (message = "An error occurred", status = 500, error?: unknown) => {
  return new Response(JSON.stringify({ success: false, message, details: error?.toString() }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};
