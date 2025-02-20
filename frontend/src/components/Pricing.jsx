import React from "react";
import { Check, Code, GitBranch, Shield } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      title: "Starter",
      price: "0",
      description: "Perfect for individual developers and small projects",
      features: ["Up to 3 team members", "Basic code collaboration", "1GB storage", "Community support"],
    },
    {
      title: "Pro",
      price: "29",
      description: "Ideal for growing teams and professional projects",
      features: ["Up to 10 team members", "Advanced collaboration", "10GB storage", "Priority support"],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "99",
      description: "For large teams and organizations with complex needs",
      features: ["Unlimited team members", "Enterprise collaboration", "Unlimited storage", "24/7 support"],
    },
  ];

  const features = [
    { icon: Code, title: "Collaborative Coding", description: "Real-time code collaboration with your team" },
    { icon: GitBranch, title: "Version Control", description: "Integrated version control system" },
    { icon: Shield, title: "Enterprise Security", description: "Advanced security to protect your code" },
  ];

  const faqs = [
    { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade anytime." },
    { question: "Is there a free trial?", answer: "Yes, all paid plans have a 14-day free trial." },
    { question: "What payment methods are accepted?", answer: "We accept major credit cards and PayPal." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-16 bg-blue-600 text-center">
        <h1 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-xl text-blue-200">Choose the perfect plan for your development needs</p>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-8 mt-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ title, price, description, features, isPopular = false }) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 ${isPopular ? "border-2 border-blue-500" : "border border-gray-200"}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <div className="mt-4 text-4xl font-bold text-gray-900">${price}/month</div>
      <p className="mt-6 text-gray-500">{description}</p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-blue-500" />
            <span className="ml-3 text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`mt-8 w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${isPopular ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
        Get Started
      </button>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-105">
      <div className="p-3 bg-blue-100 rounded-full hover:bg-blue-200">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  return (
    <div className="transition-all duration-300 hover:translate-x-2">
      <h3 className="text-lg font-semibold">{question}</h3>
      <p className="mt-2 text-gray-500">{answer}</p>
    </div>
  );
};

export default Pricing;
