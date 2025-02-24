import { useState } from 'react';

const SecureLoginModal = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_APP_PASSWORD) {
      onLogin(true);
    } else {
      setError('Password salah!');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Aktifkan Secure Mode
        </h2>
        <p className="text-gray-600 mb-6">
          Masukkan password untuk mengaktifkan mode konversi aman
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
            >
              Aktifkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecureLoginModal;
