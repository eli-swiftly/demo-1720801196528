import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from "../components";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { theme } from '../theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-background-primary p-6 rounded-lg relative w-4/5 h-4/5">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text-primary"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const DataImportContent: React.FC = () => {
  const [showDemoCreation, setShowDemoCreation] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState<boolean>(false);
  const [isWebsiteDataModalOpen, setIsWebsiteDataModalOpen] = useState<boolean>(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [websiteData, setWebsiteData] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [isTranscriptImported, setIsTranscriptImported] = useState<boolean>(false);
  const [isWebsiteDataImported, setIsWebsiteDataImported] = useState<boolean>(false);
  const [isInstructionsAdded, setIsInstructionsAdded] = useState<boolean>(false);

  const handleCreateDemoClick = () => {
    setShowDemoCreation(true);
  };

  const handleImportTranscript = () => {
    setIsTranscriptModalOpen(true);
  };

  const handleImportWebsiteData = () => {
    setIsWebsiteDataModalOpen(true);
  };

  const handleAddInstructions = () => {
    setIsInstructionsModalOpen(true);
  };

  const handleTranscriptSubmit = () => {
    if (transcript.trim()) {
      setIsTranscriptImported(true);
      setIsTranscriptModalOpen(false);
      console.log("Transcript saved:", transcript);
      localStorage.setItem("savedTranscript", transcript);
    }
  };

  const handleWebsiteDataSubmit = () => {
    if (websiteData.trim() || websiteUrl.trim()) {
      setIsWebsiteDataImported(true);
      setIsWebsiteDataModalOpen(false);
      console.log("Website data saved:", websiteData);
      console.log("Website URL saved:", websiteUrl);
      localStorage.setItem("savedWebsiteData", websiteData);
      localStorage.setItem("savedWebsiteUrl", websiteUrl);
      
      if (websiteUrl.trim()) {
        // Here you would typically call your API to fetch website data
        console.log("Fetching website data from URL:", websiteUrl);
        // Simulating API call
        setTimeout(() => {
          console.log("Website data fetched from URL");
        }, 2000);
      }
    }
  };

  const handleInstructionsSubmit = () => {
    if (instructions.trim()) {
      setIsInstructionsAdded(true);
      setIsInstructionsModalOpen(false);
      console.log("Instructions saved:", instructions);
      localStorage.setItem("savedInstructions", instructions);
    }
  };

  useEffect(() => {
    if (showDemoCreation && progress < 100) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showDemoCreation, progress]);

  const buttonStyle = {
    backgroundColor: theme.colors.text.primary,
    color: theme.colors.background.primary,
    '&:hover': {
      backgroundColor: theme.colors.text.secondary,
    },
  };

  const createDemoButtonStyle = {
    backgroundColor: theme.colors.accent.primary,
    color: theme.colors.background.primary,
    '&:hover': {
      backgroundColor: theme.colors.accent.primary,
    },
  };

  return (
    <div>
      {!showDemoCreation ? (
        <div className="flex justify-between mb-6">
          <div className="flex flex-col gap-4">
            <Button onClick={handleImportTranscript} style={buttonStyle}>
              {isTranscriptImported ? (
                <CheckCircle className="inline mr-2" />
              ) : (
                <AlertCircle className="inline mr-2" />
              )}
              {isTranscriptImported
                ? "Transcript Added"
                : "Add Transcript (Required)"}
            </Button>
            <Button onClick={handleImportWebsiteData} style={buttonStyle}>
              {isWebsiteDataImported ? (
                <CheckCircle className="inline mr-2" />
              ) : (
                <AlertCircle className="inline mr-2" />
              )}
              {isWebsiteDataImported
                ? "Website Data Added"
                : "Import Website Data (Optional)"}
            </Button>
            <Button onClick={handleAddInstructions} style={buttonStyle}>
              {isInstructionsAdded ? (
                <CheckCircle className="inline mr-2" />
              ) : (
                <AlertCircle className="inline mr-2" />
              )}
              {isInstructionsAdded
                ? "Instructions Added"
                : "Add Instructions (Optional)"}
            </Button>
          </div>
          <Button
            onClick={handleCreateDemoClick}
            style={createDemoButtonStyle}
            disabled={!isTranscriptImported}
          >
            Create Demo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Import Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none p-0">
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  Transcript: Complete
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  Website Data: Complete
                </li>
                <li className="flex items-center">
                  <span className={isInstructionsAdded ? "text-green-500 mr-2" : "text-yellow-500 mr-2"}>
                    {isInstructionsAdded ? "✓" : "⟳"}
                  </span>
                  Instructions: {isInstructionsAdded ? "Complete" : "Waiting"}
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Demo Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                AI is currently validating imported data...
              </p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-800 rounded-full h-2.5 mr-2">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span>{progress}%</span>
              </div>
              {progress === 100 && (
                <Button className="mt-4" style={createDemoButtonStyle}>
                  View Demo
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Modal isOpen={isTranscriptModalOpen} onClose={() => setIsTranscriptModalOpen(false)}>
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Paste transcript here
        </h2>
        <textarea
          className="w-full h-4/5 p-2 border border-gray-300 rounded bg-background-primary text-text-primary"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleTranscriptSubmit} style={buttonStyle}>Done</Button>
        </div>
      </Modal>

      <Modal isOpen={isWebsiteDataModalOpen} onClose={() => setIsWebsiteDataModalOpen(false)}>
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Import Website Data
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Paste manually</h3>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded bg-background-primary text-text-primary"
            value={websiteData}
            onChange={(e) => setWebsiteData(e.target.value)}
            placeholder="Paste website data here…"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Enter URL</h3>
          <Input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border border-gray-300 rounded bg-background-primary text-text-primary"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleWebsiteDataSubmit} style={buttonStyle}>Done</Button>
        </div>
      </Modal>

      <Modal isOpen={isInstructionsModalOpen} onClose={() => setIsInstructionsModalOpen(false)}>
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Add Instructions
        </h2>
        <textarea
          className="w-full h-4/5 p-2 border border-gray-300 rounded bg-background-primary text-text-primary"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter any additional instructions here..."
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleInstructionsSubmit} style={buttonStyle}>Done</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DataImportContent;