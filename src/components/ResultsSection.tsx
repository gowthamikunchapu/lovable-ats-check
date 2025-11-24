import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ResultsSectionProps {
  fileName: string;
}

const ResultsSection = ({ fileName }: ResultsSectionProps) => {
  const [atsScore, setAtsScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate score animation
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const targetScore = 72; // Demo score
      let current = 0;
      const increment = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
          setAtsScore(targetScore);
          clearInterval(increment);
        } else {
          setAtsScore(current);
        }
      }, 30);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const keywordMatches = [
    { keyword: "Project Management", found: true },
    { keyword: "Agile/Scrum", found: true },
    { keyword: "Data Analysis", found: true },
    { keyword: "Budget Planning", found: false },
    { keyword: "Stakeholder Management", found: true },
    { keyword: "Risk Assessment", found: false },
  ];

  const suggestions = [
    {
      title: "Add Missing Keywords",
      description: "Include 'Budget Planning' and 'Risk Assessment' to match common job requirements.",
      priority: "high"
    },
    {
      title: "Improve Formatting",
      description: "Use standard section headers like 'Work Experience' and 'Education' for better ATS parsing.",
      priority: "medium"
    },
    {
      title: "Quantify Achievements",
      description: "Add numbers and metrics to your accomplishments (e.g., 'Increased sales by 25%').",
      priority: "high"
    },
    {
      title: "Remove Graphics",
      description: "Tables and images may not be read correctly by ATS systems. Use plain text formatting.",
      priority: "low"
    },
  ];

  return (
    <section className={`py-16 bg-muted transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-2">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Analyzing: {fileName}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your ATS Analysis Results
            </h2>
          </div>

          {/* Score Card */}
          <Card className="shadow-medium border-0 animate-scale-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">ATS Compatibility Score</CardTitle>
              <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`text-7xl font-display font-bold ${getScoreColor(atsScore)} animate-count-up`}>
                  {atsScore}%
                </div>
                <Badge 
                  variant={atsScore >= 80 ? "default" : atsScore >= 60 ? "secondary" : "destructive"}
                  className="mt-4 text-base px-4 py-1"
                >
                  {getScoreLabel(atsScore)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Compatibility</span>
                  <span className="font-medium text-foreground">{atsScore}%</span>
                </div>
                <Progress value={atsScore} className="h-3" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-foreground mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Formatting</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-foreground mb-1">67%</div>
                  <div className="text-sm text-muted-foreground">Keywords</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-foreground mb-1">90%</div>
                  <div className="text-sm text-muted-foreground">Structure</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          <Card className="shadow-medium border-0 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Keyword Match Analysis
              </CardTitle>
              <CardDescription>Key skills and terms found in your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {keywordMatches.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    {item.found ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${item.found ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.keyword}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="shadow-medium border-0 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Improvement Suggestions
              </CardTitle>
              <CardDescription>Actionable recommendations to boost your ATS score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                      <Badge 
                        variant={
                          suggestion.priority === "high" ? "destructive" : 
                          suggestion.priority === "medium" ? "secondary" : 
                          "outline"
                        }
                        className="text-xs"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
