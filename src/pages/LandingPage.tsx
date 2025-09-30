import { Shield, MapPin, Network, Users, Eye, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-tourism.jpg";
import Navigation from "@/components/Navigation";
import HeatmapPreview from "@/components/HeatmapPreview";

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain-Verified Identity",
      description: "Your personal data is secured with blockchain technology, ensuring complete privacy and tamper-proof identity verification."
    },
    {
      icon: Eye,
      title: "Real-time Anomaly Detection",
      description: "Advanced ML algorithms continuously monitor your journey, detecting potential risks and safety concerns in real-time."
    },
    {
      icon: Route,
      title: "AI-Powered Safe Routes",
      description: "Get intelligent route recommendations that prioritize your safety while ensuring you reach your destination efficiently."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Travel with Confidence.
            <br />
            <span className="text-accent">Your Safety, Secured.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Paryatak Suraksha uses blockchain and AI to ensure a secure and worry-free journey across India.
          </p>
          
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent-glow text-accent-foreground px-12 py-6 text-xl font-semibold safety-glow transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link to="/signup">Create Your Safe Profile</Link>
          </Button>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Why Trust Paryatak Suraksha?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets human compassion to create the most comprehensive tourist safety platform in India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="trust-card border-0 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Heatmap Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Live Safety Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our real-time safety heatmap helps you navigate with confidence, showing safe zones in green, caution areas in yellow, and high-risk zones in red.
            </p>
          </div>

          <HeatmapPreview />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Travel Safely?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust Paryatak Suraksha for their safety and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold trust-shadow"
              asChild
            >
              <Link to="/signup">Sign Up as Traveler</Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link to="/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Paryatak Suraksha</span>
              </div>
              <p className="text-primary-foreground/80">
                Securing your journey across India with advanced technology and compassionate support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#features" className="nav-link">Features</a></li>
                <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
                <li><a href="#privacy" className="nav-link">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <p className="text-primary-foreground/80">
                24/7 Emergency Support<br />
                +91 1800-SAFETY<br />
                help@paryatak-suraksha.in
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Paryatak Suraksha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;