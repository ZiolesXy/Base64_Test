import { useState, useEffect } from "react";
import ModeSelector from "./ModeSelector";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import SecureLoginModal from "./SecureLoginModal";

const Base64Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isSecureAuthenticated") === "true";
  });

  // Fungsi untuk mengubah teks ke angka
  const textToNumbers = (text) => {
    return text
      .split("")
      .map(char => char.charCodeAt(0))
      .join(":");
  };

  // Fungsi untuk mengubah angka kembali ke teks
  const numbersToText = (numbers) => {
    return numbers
      .split(":")
      .map(num => String.fromCharCode(parseInt(num)))
      .join("");
  };

  // Fungsi enkripsi secure
  const secureEncrypt = (text) => {
    const numbers = textToNumbers(text);
    return btoa(numbers);
  };

  // Fungsi dekripsi secure
  const secureDecrypt = (encoded) => {
    try {
      const numbers = atob(encoded);
      return numbersToText(numbers);
    } catch (error) {
      return "Error: Format tidak valid";
    }
  };

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    if (mode === "encrypt") {
      try {
        // Perbaikan logika enkripsi
        const result = isSecureMode ? secureEncrypt(input) : btoa(input);
        setOutput(result);
      } catch (error) {
        setOutput("Error: Teks tidak valid untuk dienkripsi");
      }
    }
  }, [input, mode, isSecureMode]); // Tambahkan isSecureMode sebagai dependency

  const handleDecrypt = () => {
    try {
      // Perbaikan logika dekripsi
      const result = isSecureMode ? secureDecrypt(input) : atob(input);
      setOutput(result);
    } catch (error) {
      setOutput(isSecureMode 
        ? "Error: Format secure encryption tidak valid" 
        : "Error: Format Base64 tidak valid"
      );
    }
  };

  const handleSecureModeToggle = () => {
    if (!isSecureMode) {
      if (!isAuthenticated) {
        setShowLoginModal(true);
      } else {
        setIsSecureMode(true);
        setInput(""); // Reset input saat mengaktifkan secure mode
        setOutput(""); // Reset output saat mengaktifkan secure mode
      }
    } else {
      setIsSecureMode(false);
      setInput(""); // Reset input saat menonaktifkan secure mode
      setOutput(""); // Reset output saat menonaktifkan secure mode
    }
  };

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      setIsSecureMode(true);
      setShowLoginModal(false);
      localStorage.setItem("isSecureAuthenticated", "true");
      setInput(""); // Reset input setelah login
      setOutput(""); // Reset output setelah login
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSecureMode(false);
    setInput("");
    setOutput("");
    localStorage.removeItem("isSecureAuthenticated");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        alert("Hasil telah disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Base64 Encoder/Decoder
        </h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <ModeSelector mode={mode} setMode={setMode} />
        <div className="flex items-center gap-3">
          <button
            onClick={handleSecureModeToggle}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 
                      ${isSecureMode 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {isSecureMode ? '🔒 Secure Mode' : '🔓 Normal Mode'}
          </button>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 
                       border border-red-600 rounded-lg hover:bg-red-50
                       transition-colors duration-200"
            >
              Logout Secure Mode
            </button>
          )}
        </div>
      </div>

      <InputArea 
        input={input} 
        setInput={setInput} 
        mode={mode}
        isSecureMode={isSecureMode} // Pastikan prop ini diteruskan
      />

      <div className="flex justify-center gap-4 my-6">
        {mode === "decrypt" && (
          <button
            onClick={handleDecrypt}
            className="w-48 py-2 px-4 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-opacity-50"
          >
            Decrypt
          </button>
        )}

        <button
          onClick={handleClear}
          className="w-48 py-2 px-4 bg-gray-500 text-white rounded-lg
                   hover:bg-gray-600 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-gray-400 
                   focus:ring-opacity-50"
        >
          Clear
        </button>
      </div>

      <OutputArea 
        output={output} 
        isSecureMode={isSecureMode} // Pastikan prop ini diteruskan
      />

      {output && (
        <button
          onClick={handleCopy}
          className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg
                   hover:bg-green-700 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:ring-opacity-50"
        >
          Salin Hasil
        </button>
      )}

      {showLoginModal && (
        <SecureLoginModal 
          onLogin={handleLogin} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </div>
  );
};

export default Base64Converter;
