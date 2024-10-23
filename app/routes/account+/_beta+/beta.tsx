// app/routes/account+/_beta+/beta.tsx
import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { ApiStatusAlert } from '#app/components/engine/api-status';
import { InputSection } from '#app/components/engine/input';
import { OutputSection } from '#app/components/engine/output';
import { ProcessorSection } from '#app/components/engine/processor';
import { ProgressStepper } from '#app/components/engine/progress';
import  { type LoaderData } from '#app/utils/beta/types';
import { useFileProcessing } from '#app/utils/beta/use-file-processing';

export const loader: LoaderFunction = async () => {
  return json({ apiAccessible: true });
};

interface SectionTitleProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function SectionTitle({ title, isActive, onClick }: SectionTitleProps) {
  return (
    <h2
      className={`text-2xl font-semibold p-4 mb-4 cursor-pointer ${
        isActive ? 'text-blue-600' : 'text-gray-400'
      }`}
      onClick={onClick}
    >
      {title}
    </h2>
  );
}

export default function AppIndex() {
  const { apiAccessible } = useLoaderData<LoaderData>();
  const {
    currentStep,
    setCurrentStep,
    summary,
    file,
    isProcessing,
    logs,
    outputData,
    handleFileChange,
    handleProcess
  } = useFileProcessing();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Beta v1.0
      </h1>
      
      <div className="space-y-8">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <SectionTitle 
            title="Input" 
            isActive={currentStep === 1} 
            onClick={() => setCurrentStep(1)} 
          />
          {currentStep === 1 && <InputSection onFileChange={handleFileChange} />}
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <SectionTitle 
            title="Processor" 
            isActive={currentStep === 2} 
            onClick={() => setCurrentStep(2)} 
          />
          {currentStep === 2 && (
            <>
              <ProcessorSection 
                onProcess={handleProcess}
                isProcessing={isProcessing}
                logs={logs}
                file={file}
              />
              <div className="p-4 shadow-sm">
                <ProgressStepper 
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            </>
          )}
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <SectionTitle 
            title="Output" 
            isActive={currentStep === 3} 
            onClick={() => setCurrentStep(3)} 
          />
          {currentStep === 3 && (
            <OutputSection 
              summary={summary}
              outputData={outputData}
            />
          )}
        </div>
      </div>

      <ApiStatusAlert apiAccessible={apiAccessible} />
    </div>
  );
}