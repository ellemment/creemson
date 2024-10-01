import React, { useState } from 'react';

export function ProcessorSection() {
  const [limitRows, setLimitRows] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock columns for demonstration
  const availableColumns = ['ID', 'Name', 'Category', 'Price', 'Description'];

  const handleStartProcessing = () => {
    setIsProcessing(true);
    // Add your processing logic here
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">File Details</h3>
        <p className="text-gray-600 dark:text-gray-400">Selected file: example.csv</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Column Selection</h3>
        <div className="space-y-2">
          {availableColumns.map((column) => (
            <label key={column} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColumns([...selectedColumns, column]);
                  } else {
                    setSelectedColumns(selectedColumns.filter(c => c !== column));
                  }
                }}
                className="form-checkbox"
              />
              <span>{column}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="limit-rows" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Limit Rows</label>
        <input
          type="number"
          id="limit-rows"
          value={limitRows}
          onChange={(e) => setLimitRows(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter number of rows"
        />
      </div>

      <div>
        <button
          onClick={handleStartProcessing}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isProcessing ? 'Processing...' : 'Start Processing'}
        </button>
      </div>

      {isProcessing && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
        </div>
      )}
    </div>
  );
}