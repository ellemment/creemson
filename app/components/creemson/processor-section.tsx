import React from 'react';

interface ProcessorSectionProps {
  onProcess: () => void;
  isProcessing: boolean;
  logs: string[];
}

export function ProcessorSection({ onProcess, isProcessing, logs }: ProcessorSectionProps) {
  return (
    <div className="p-6">
      <button
        onClick={onProcess}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 mb-4"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Process File'}
      </button>
      <div className="mt-4 h-64 overflow-y-auto p-4 rounded">
        {logs.map((log, index) => (
          <div key={index} className="text-sm">{log}</div>
        ))}
      </div>
    </div>
  );
}