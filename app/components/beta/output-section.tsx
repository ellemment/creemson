// app/components/beta/output-section.tsx

import React from 'react';
import { ResultsDetailed } from './results-detailed';
import { ResultsOverview } from './results-overview';


export function OutputSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="space-y-4">
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Generate RMS Output</button>
          <div>
            <h3 className="text-lg font-medium mb-2">Download Files</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><a href="#" className="text-blue-500 hover:underline">Download Check File</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Download Output File</a></li>
            </ul>
          </div>
        </div>
      </div>
      <ResultsOverview />
      <ResultsDetailed />
    </div>
  );
}