
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, Users, Zap, Target, Trophy, ArrowRight, FileText } from 'lucide-react';

const Index = () => {
  const learningPaths = [
    {
      title: "HTML Fundamentals",
      description: "Master semantic markup and accessibility",
      icon: <FileText className="w-6 h-6" />,
      topics: ["Semantic Elements", "Forms & Validation", "Accessibility", "SEO Basics"],
      difficulty: "Beginner",
      color: "bg-orange-500"
    },
    {
      title: "CSS Mastery",
      description: "Modern styling with layouts and animations",
      icon: <Code className="w-6 h-6" />,
      topics: ["Flexbox & Grid", "Responsive Design", "Animations", "Custom Properties"],
      difficulty: "Intermediate",
      color: "bg-blue-500"
    },
    {
      title: "JavaScript Essentials",
      description: "Core language features and modern patterns",
      icon: <Zap className="w-6 h-6" />,
      topics: ["ES6+ Features", "Async/Await", "DOM Manipulation", "Error Handling"],
      difficulty: "Intermediate",
      color: "bg-yellow-500"
    },
    {
      title: "TypeScript Guide",
      description: "Type-safe JavaScript development",
      icon: <Target className="w-6 h-6" />,
      topics: ["Types & Interfaces", "Generics", "React Integration", "Advanced Patterns"],
      difficulty: "Advanced",
      color: "bg-indigo-500"
    },
    {
      title: "React Development",
      description: "Component-based UI development",
      icon: <Users className="w-6 h-6" />,
      topics: ["Components & Hooks", "State Management", "Performance", "Testing"],
      difficulty: "Intermediate",
      color: "bg-cyan-500"
    },
    {
      title: "Next.js Framework",
      description: "Full-stack React applications",
      icon: <BookOpen className="w-6 h-6" />,
      topics: ["App Router", "Server Components", "API Routes", "Optimization"],
      difficulty: "Advanced",
      color: "bg-purple-500"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Comprehensive Guides",
      description: "In-depth documentation covering all essential frontend technologies"
    },
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: "Practical Examples",
      description: "Real-world code examples with detailed explanations"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Best Practices",
      description: "Industry-standard patterns and proven methodologies"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      title: "Common Pitfalls",
      description: "Learn from mistakes and avoid common development traps"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Frontend Developer Learning Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Modern 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Frontend</span>
              <br />Development
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive guides, practical examples, and best practices for HTML, CSS, JavaScript, 
              React, TypeScript, Next.js, TailwindCSS, and testing frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our learning platform provides structured guidance for developers at every stage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learning Paths
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured guides to take you from beginner to expert in frontend development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <div className={`h-2 ${path.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${path.color} text-white mb-4`}>
                      {path.icon}
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {path.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-4 group-hover:bg-blue-600 transition-colors">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Preview Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Detailed Documentation Available
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Access comprehensive guides with code examples, best practices, and common pitfalls for each technology.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Testing'].map((tech) => (
                <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              View All Documentation
              <FileText className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-2xl bg-gradient-to-r from-slate-50 to-blue-50">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Level Up Your Skills?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Join thousands of developers who have mastered frontend development with our comprehensive guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-3">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Browse Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
