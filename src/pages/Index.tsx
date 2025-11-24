import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import { toast } from "sonner";

const Index = () => {
  const [analyzedFile, setAnalyzedFile] = useState<string | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleFileUpload = (file: File) => {
    // Simulate analysis delay
    toast.loading("Analyzing your resume...", { duration: 2000 });
    
    setTimeout(() => {
      setAnalyzedFile(file.name);
      toast.success("Analysis complete!");
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Hero onUploadClick={handleUploadClick} />
      
      <div ref={uploadSectionRef}>
        <UploadSection onFileUpload={handleFileUpload} />
      </div>
      
      {analyzedFile && <ResultsSection fileName={analyzedFile} />}
      
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ATS Resume Checker. Built with ❤️ to help job seekers succeed.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Your privacy matters. Uploaded resumes are not stored.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
