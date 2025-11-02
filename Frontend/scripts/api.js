const API = 'http://localhost:3000';
export async function apiGet(url) {
  const r = await fetch(API + url, { credentials: 'include' });
  return r.json();
}
export async function apiPost(url, data, isForm = false) {
  const opt = { method: 'POST', credentials: 'include' };
  if (isForm) opt.body = data;
  else { opt.body = JSON.stringify(data); opt.headers = { 'Content-Type': 'application/json' }; }
  const r = await fetch(API + url, opt);
  return r.json();
}
export async function apiPut(url, data) {
  const r = await fetch(API + url, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return r.json();
}
export async function apiDelete(url) {
  const r = await fetch(API + url, { method: 'DELETE', credentials: 'include' });
  return r.json();
}