const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setMode("encrypt")}
        className={`px-6 py-2 rounded-lg transition-colors duration-200
                   ${
                     mode === "encrypt"
                       ? "bg-blue-600 text-white"
                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                   }`}
      >
        Encrypt
      </button>
      <button
        onClick={() => setMode("decrypt")}
        className={`px-6 py-2 rounded-lg transition-colors duration-200
                   ${
                     mode === "decrypt"
                       ? "bg-blue-600 text-white"
                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                   }`}
      >
        Decrypt
      </button>
    </div>
  );
};

export default ModeSelector;
