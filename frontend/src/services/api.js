const API_URL = "https://www-suareceita.onrender.com/api";

export const fetchAPI = async (endpoint, method = "GET", body = null) => {
  const headers = { "Content-Type": "application/json" };

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.erro || "Erro na requisição");
  return data;
};

export const fetchFormData = async (endpoint, formData, method = "POST") => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    credentials: "include",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.erro || "Erro na requisição");
  return data;
};
