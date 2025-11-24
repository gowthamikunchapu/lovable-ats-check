import { useCallback, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
}

const UploadSection = ({ onFileUpload }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const validTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload a PDF or DOC file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
    toast.success(`${file.name} ready to analyze`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    toast.info("File removed");
  };

  return (
    <section className="py-16 bg-background" id="upload-section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground text-lg">
              We'll analyze it against ATS best practices and provide actionable feedback
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border bg-card hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Upload className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium text-foreground">
                    Drag and drop your resume here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
                
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                  size="lg"
                  className="mt-4"
                >
                  Choose File
                </Button>

                <p className="text-xs text-muted-foreground pt-4">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="mt-6 text-center">
              <Button 
                onClick={handleAnalyze}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium font-semibold"
              >
                Analyze Resume
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
