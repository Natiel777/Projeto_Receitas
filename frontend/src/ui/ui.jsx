export function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-orange-400"
        {...props}
      />
    </div>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
}

export function Botao({ children, ...props }) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      {...props}
    >
      {children}
    </button>
  );
}
