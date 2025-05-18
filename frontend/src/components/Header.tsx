function Header() {
  return (
    <header className="p-4">
      <input
        type="text"
        placeholder="Caută conversații..."
        className="mr-2 p-2 border rounded"
      />
      <button
        onClick={() => {
          /* Logica Creare Conversație */
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Nouă Conversație
      </button>
      <button
        onClick={() => {
          /* Logica Creare Grup */
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Nou Grup
      </button>
      <button
        onClick={() => {
          /* Logica Adăugare Prieten */
        }}
        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
      >
        Adaugă Prieten
      </button>
      <button
        onClick={() => {
          /* Logica Deschidere Setări */
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
      >
        Setări
      </button>
      {/* ... Buton Administrator (condițional) ... */}
    </header>
  );
}

export default Header;
