function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-4 text-center text-sm shadow-inner dark:shadow-gray-700">
      <p>
        &copy; {new Date().getFullYear()} Sua Receita. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}

export default Footer;
