import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import { ApiStatusAlert } from '#app/components/beta/common/api-status-alert';
import { ProgressStepper } from '#app/components/beta/common/progress-stepper';
import { InputSection } from '#app/components/beta/input-section';
import { OutputSection } from '#app/components/beta/output-section';
import { ProcessorSection } from '#app/components/beta/processor-section';
import { processFile } from '#app/utils/creemson-api';

interface LoaderData {
  apiAccessible: boolean;
}

export const loader: LoaderFunction = async () => {
  // You can add a check here to see if the API is accessible
  return json({ apiAccessible: true });
};

export default function AppIndex() {
  const { apiAccessible } = useLoaderData<LoaderData>();
  const [currentStep, setCurrentStep] = useState(1);
  const [summary, setSummary] = useState<string | null>(null);
  const [outputData, setOutputData] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setLogs([]);
  };

  const handleProcess = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }
    try {
      setIsProcessing(true);
      setCurrentStep(2);
      setLogs([]);
      const result = await processFile(file, (log) => {
        setLogs((prevLogs) => [...prevLogs, log]);
      });
      setSummary("Processing complete");
      setOutputData(result);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error processing file:', error);
      setSummary("Error processing file");
    } finally {
      setIsProcessing(false);
    }
  };

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
        {currentStep === 1 && <InputSection onFileChange={handleFileChange} />}
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {renderSectionTitle("Processor", currentStep === 2, () => setCurrentStep(2))}
        {currentStep === 2 && (
          <>
            <ProcessorSection onProcess={handleProcess} isProcessing={isProcessing} logs={logs} />
            <div className="p-4 shadow-sm">
              <ProgressStepper currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            </div>
          </>
        )}
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {renderSectionTitle("Output", currentStep === 3, () => setCurrentStep(3))}
        {currentStep === 3 && <OutputSection summary={summary} outputData={outputData} />}
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