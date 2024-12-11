import { useState } from 'react';
import { FileDown} from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { PDFModal } from './PDFModal';

interface PDFHeaderProps {
  filename: string;
  onFilenameChange: (value: string) => void;
  onGenerate: () => void;
}

export function PDFHeader({ filename, onFilenameChange, onGenerate }: PDFHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const handleGenerate = () => {
    onGenerate();
    setIsModalOpen(false);
  };

  if (isMobileOrTablet) {
    return (
      <>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 btn-primary rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Generate PDF"
        >
          <FileDown className="w-6 h-6" />
        </button>

        <PDFModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          filename={filename}
          onFilenameChange={onFilenameChange}
          onGenerate={handleGenerate}
        />
      </>
    );
  }

  return (
    <div className="fixed top-0 right-0 z-50 bg-white shadow-md p-4 m-4 rounded-lg flex items-center gap-4">
      <div>
        <label htmlFor="pdfFilename" className="form-label block mb-1">PDF Filename</label>
        <input
          id="pdfFilename"
          type="text"
          value={filename}
          onChange={(e) => onFilenameChange(e.target.value)}
          className="input-field w-48"
          placeholder="Enter filename"
        />
      </div>
      <button 
        onClick={onGenerate} 
        className="btn-primary flex items-center h-[42px] mt-6"
      >
        <FileDown className="w-5 h-5 mr-2" />
        Generate PDF
      </button>
    </div>
  );
}