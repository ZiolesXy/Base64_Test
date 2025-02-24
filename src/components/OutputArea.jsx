const OutputArea = ({ output, isSecureMode }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-gray-700 text-sm font-bold">
          Hasil
        </label>
        {isSecureMode && (
          <span className="text-xs text-purple-600 font-medium">
            🔒 Secure Result
          </span>
        )}
      </div>
      <textarea
        value={output}
        readOnly
        className="w-full min-h-[150px] p-3 bg-gray-50 border border-gray-300
                 rounded-lg resize-y"
      />
    </div>
  );
};

export default OutputArea;
