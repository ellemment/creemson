// app/routes/account+/_beta+/beta.tsx
import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, { useState, useEffect } from 'react';
import { ApiStatusAlert } from '#app/components/creemson/common/api-status-alert';
import { ProgressStepper } from '#app/components/creemson/common/progress-stepper';
import { InputSection } from '#app/components/creemson/input-section';
import { OutputSection } from '#app/components/creemson/output-section';
import { ProcessorSection } from '#app/components/creemson/processor-section';
import { processFile } from '#app/utils/creemson/creemson-api.js';

interface LoaderData {
  apiAccessible: boolean;
}

export const loader: LoaderFunction = async () => {
  console.log('Loader function called');
  // You can add a check here to see if the API is accessible
  return json({ apiAccessible: true });
};

export default function AppIndex() {
  console.log('AppIndex component rendered');

  const { apiAccessible } = useLoaderData<LoaderData>();
  console.log('API Accessible:', apiAccessible);

  const [currentStep, setCurrentStep] = useState(1);
  const [summary, setSummary] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [outputData, setOutputData] = useState<any>({
    check_filename_csv: null,
    check_filename_excel: null,
    final_filename_csv: null,
    final_filename_excel: null,
    rows: null,
    columns: null
  });

  useEffect(() => {
    console.log('Current step:', currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.log('File state changed:', file?.name);
  }, [file]);

  useEffect(() => {
    console.log('Processing state:', isProcessing);
  }, [isProcessing]);

  useEffect(() => {
    console.log('Logs updated:', logs);
  }, [logs]);

  useEffect(() => {
    console.log('Output data updated:', outputData);
  }, [outputData]);

  const handleFileChange = (selectedFile: File | null) => {
    console.log('File changed:', selectedFile?.name);
    setFile(selectedFile);
    setLogs([]);
  };

  const handleProcess = async (filename: string, selectedColumns: number[]) => {
    console.log('Process started for file:', filename);
    console.log('Selected columns:', selectedColumns);
    try {
      setIsProcessing(true);
      setCurrentStep(2);
      setLogs([]);
      console.log('Calling processFile function');
      const result = await processFile({
        filename,
        selectedColumns,
        onLog: (log: string) => {
          console.log('Log received:', log);
          setLogs((prevLogs) => [...prevLogs, log]);
        }
      });
      console.log('Process completed. Result:', result);
      setSummary("Processing complete");
      console.log("Setting output data:", result.output_data);
      setOutputData(result.output_data);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error processing file:', error);
      setSummary("Error processing file");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderSectionTitle = (title: string, isActive: boolean, onClick: () => void) => {
    console.log(`Rendering section title: ${title}, Active: ${isActive}`);
    return (
      <h2
        className={`text-2xl font-semibold p-4 mb-4 cursor-pointer ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
        onClick={onClick}
      >
        {title}
      </h2>
    );
  };

  const renderContent = () => {
    console.log('Rendering content');
    return (
      <div className="space-y-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          {renderSectionTitle("Input", currentStep === 1, () => setCurrentStep(1))}
          {currentStep === 1 && <InputSection onFileChange={handleFileChange} />}
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          {renderSectionTitle("Processor", currentStep === 2, () => setCurrentStep(2))}
          {currentStep === 2 && (
            <>
              <ProcessorSection onProcess={handleProcess} isProcessing={isProcessing} logs={logs} file={file} />
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
  };

  console.log('Rendering AppIndex component');
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Beta v1.0</h1>
      {renderContent()}
      <ApiStatusAlert apiAccessible={apiAccessible} />
    </div>
  );
}