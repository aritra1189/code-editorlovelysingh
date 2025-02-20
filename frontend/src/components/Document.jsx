import React, { useState } from 'react';
import { Book, Code, Terminal, Users, Search, Copy } from 'lucide-react';

function SidebarLink({ icon: Icon, text, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{text}</span>
    </button>
  );
}

function CodeBlock({ code, language }) {
  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="p-2 hover:bg-gray-700 rounded-md transition-colors"
        >
          <Copy className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <code className="text-gray-100 text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

function DocSection({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Document() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = {
    'getting-started': {
      icon: Book,
      title: 'Getting Started',
      content: (
        <>
          <DocSection title="Quick Start">
            <p className="text-gray-600 mb-4">
              Get started with CodeCollab in minutes. Follow these simple steps to begin collaborating and coding.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create an Account</h3>
                  <p className="text-gray-600">Sign up for a free account to get started with CodeCollab.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create a Project</h3>
                  <p className="text-gray-600">Start a new project or import an existing one from GitHub.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Invite Collaborators</h3>
                  <p className="text-gray-600">Add team members to collaborate in real-time.</p>
                </div>
              </div>
            </div>
          </DocSection>
        </>
      )
    },
    'collaboration': {
      icon: Users,
      title: 'Real-time Collaboration',
      content: (
        <>
          <DocSection title="Collaborative Features">
            <p className="text-gray-600 mb-6">
              CodeCollab provides powerful real-time collaboration features that make team coding seamless and efficient.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Live Editing</h3>
                <p className="text-gray-600">See your teammates' changes in real-time as they type, with cursor positions and selections visible.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Chat & Comments</h3>
                <p className="text-gray-600">Discuss code and leave inline comments directly in the editor.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Version Control</h3>
                <p className="text-gray-600">Built-in Git integration for managing code versions and branches.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Share Sessions</h3>
                <p className="text-gray-600">Generate shareable links for quick collaboration sessions.</p>
              </div>
            </div>
          </DocSection>
        </>
      )
    },
    'code-execution': {
      icon: Terminal,
      title: 'Code Execution',
      content: (
        <>
          <DocSection title="Running Your Code">
            <p className="text-gray-600 mb-6">
              Execute code directly in the browser with our powerful compilation engine.
            </p>
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Example: Running JavaScript Code</h3>
              <CodeBlock 
                language="javascript"
                code={`// Create a new project
const project = new CodeCollab.Project();

// Configure runtime
project.setRuntime('node', '16');

// Run code
project.execute(\`
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  console.log(fibonacci(10));
\`);`}
              />
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Make sure your code doesn't contain infinite loops or resource-intensive operations.
                  </p>
                </div>
              </div>
            </div>
          </DocSection>
        </>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CodeCollab Docs</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {Object.entries(sections).map(([key, section]) => (
                <SidebarLink
                  key={key}
                  icon={section.icon}
                  text={section.title}
                  isActive={activeSection === key}
                  onClick={() => setActiveSection(key)}
                />
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose max-w-none">
                {sections[activeSection].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;