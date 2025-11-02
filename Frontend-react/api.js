const BASE_URL = 'http://localhost:3000';

export async function apiGet(path) {
  const res = await fetch(BASE_URL + path, { credentials: 'include' });
  return await res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  return await res.json();
}

export async function apiPut(path, data) {
  const res = await fetch(BASE_URL + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  return await res.json();
}

export async function apiDelete(path) {
  const res = await fetch(BASE_URL + path, {
    method: 'DELETE',
    credentials: 'include'
  });
  return await res.json();
}
