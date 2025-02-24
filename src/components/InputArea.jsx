const InputArea = ({ input, setInput, mode, isSecureMode }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-gray-700 text-sm font-bold">
          Input Text
        </label>
        {isSecureMode && (
          <span className="text-xs text-purple-600 font-medium">
            🔒 Secure Conversion Mode
          </span>
        )}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          mode === "encrypt"
            ? "Masukkan teks untuk dienkripsi"
            : "Masukkan teks Base64 untuk didekripsi"
        }
        className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-transparent resize-y"
      />
    </div>
  );
};

export default InputArea;
