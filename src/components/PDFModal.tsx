import React from 'react';
import { X } from 'lucide-react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  onFilenameChange: (value: string) => void;
  onGenerate: () => void;
}

export function PDFModal({ isOpen, onClose, filename, onFilenameChange, onGenerate }: PDFModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Generate PDF</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="modal-filename" className="form-label block mb-2">
              PDF Filename
            </label>
            <input
              id="modal-filename"
              type="text"
              value={filename}
              onChange={(e) => onFilenameChange(e.target.value)}
              className="input-field"
              placeholder="Enter filename"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onGenerate}
              className="btn-primary"
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}