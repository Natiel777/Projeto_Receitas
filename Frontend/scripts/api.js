export const API_BASE = 'http://localhost:3000';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include'
  });
  return res.json();
}

export async function apiPost(path, data, isForm = false) {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: isForm ? {} : { 'Content-Type': 'application/json' },
    body: isForm ? data : JSON.stringify(data)
  };
  const res = await fetch(`${API_BASE}${path}`, options);
  return res.json();
}

export async function apiPut(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return res.json();
}