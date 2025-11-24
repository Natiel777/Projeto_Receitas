const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL || "https://suareceita.onrender.com";

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

export const fetchFormData = async (endpoint, formData) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.erro || "Erro na requisição");
  return data;
};
