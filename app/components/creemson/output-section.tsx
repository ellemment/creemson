// app/components/beta/output-section.tsx

import React from 'react';

interface OutputSectionProps {
  summary: string | null;
  outputData: any | null;
}

export function OutputSection({ summary, outputData }: OutputSectionProps) {
  const handleDownload = () => {
    // Implement download functionality here
    console.log("Downloading output...");
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Output</h2>
      
      {summary && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      
      {outputData && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Output Data</h3>
          <pre className=" p-2 rounded">
            {JSON.stringify(outputData, null, 2)}
          </pre>
        </div>
      )}
      
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Download Output
      </button>
    </div>
  );
}