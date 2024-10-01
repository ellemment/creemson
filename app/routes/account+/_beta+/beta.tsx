import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import { ApiStatusAlert } from '#app/components/beta/common/api-status-alert';
import { ProgressStepper } from '#app/components/beta/common/progress-stepper';
import { InputSection } from '#app/components/beta/input-section';
import { OutputSection } from '#app/components/beta/output-section';
import { ProcessorSection } from '#app/components/beta/processor-section';

interface LoaderData {
  apiAccessible: boolean;
}

export const loader: LoaderFunction = async () => {
  return json({ apiAccessible: true });
};

export default function AppIndex() {
  const { apiAccessible } = useLoaderData<LoaderData>();
  const [currentStep, setCurrentStep] = useState(1);

  const renderSectionTitle = (title: string, isActive: boolean, onClick: () => void) => (
    <h2
      className={`text-2xl font-semibold p-4 mb-4 cursor-pointer ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
      onClick={onClick}
    >
      {title}
    </h2>
  );

  const renderContent = () => (
    <div className="space-y-8">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {renderSectionTitle("Input", currentStep === 1, () => setCurrentStep(1))}
        {currentStep === 1 && <InputSection />}
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {renderSectionTitle("Processor", currentStep === 2, () => setCurrentStep(2))}
        {currentStep === 2 && (
          <>
            <ProcessorSection />
            <ProgressStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Process
              </button>
            </div>
          </>
        )}
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {renderSectionTitle("Output", currentStep === 3, () => setCurrentStep(3))}
        {currentStep === 3 && <OutputSection />}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Beta v1.0</h1>
      {renderContent()}
      <ApiStatusAlert apiAccessible={apiAccessible} />
    </div>
  );
}