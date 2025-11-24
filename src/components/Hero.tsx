import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

interface HeroProps {
  onUploadClick: () => void;
}

const Hero = ({ onUploadClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Beat the Bots.<br />
              Land the Interview.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
              Upload your resume and get instant feedback on ATS compatibility. 
              Identify gaps, optimize keywords, and boost your chances of getting noticed.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={onUploadClick}
                className="bg-card text-primary hover:bg-card/90 shadow-medium font-semibold group"
              >
                <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Upload Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold backdrop-blur-sm"
              >
                View Sample Report
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:block hidden animate-scale-in">
            <div className="absolute inset-0 bg-primary-foreground/10 blur-3xl rounded-full" />
            <img 
              src={heroImage} 
              alt="ATS Resume Analysis Visualization" 
              className="relative z-10 w-full h-auto rounded-2xl shadow-large"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
