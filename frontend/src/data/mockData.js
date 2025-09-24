// Mock data for ChatGPT clone
export const mockConversations = [
  {
    id: '1',
    title: 'Help with React components',
    timestamp: '2025-01-23T10:30:00Z',
    messages: [
      {
        id: 'm1',
        type: 'user',
        content: 'How do I create a reusable button component in React?',
        timestamp: '2025-01-23T10:30:00Z'
      },
      {
        id: 'm2', 
        type: 'ai',
        content: 'Here\'s how you can create a reusable button component in React:\n\n```jsx\nimport React from \'react\';\n\nconst Button = ({ children, variant = \'primary\', size = \'medium\', onClick, disabled = false, ...props }) => {\n  const baseStyles = \'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2\';\n  \n  const variants = {\n    primary: \'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500\',\n    secondary: \'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500\',\n    outline: \'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500\'\n  };\n  \n  const sizes = {\n    small: \'text-sm px-3 py-1.5\',\n    medium: \'text-base px-4 py-2\',\n    large: \'text-lg px-6 py-3\'\n  };\n  \n  return (\n    <button\n      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? \'opacity-50 cursor-not-allowed\' : \'\'}`}\n      onClick={onClick}\n      disabled={disabled}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n};\n\nexport default Button;\n```\n\nThis component provides:\n- Multiple variants (primary, secondary, outline)\n- Different sizes (small, medium, large)\n- Proper accessibility with focus states\n- Disabled state handling\n- Spread props for additional customization',
        timestamp: '2025-01-23T10:31:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Urdu translation project',
    timestamp: '2025-01-22T15:45:00Z',
    messages: [
      {
        id: 'm3',
        type: 'user',
        content: 'Can you help me translate English text to Urdu?',
        timestamp: '2025-01-22T15:45:00Z'
      },
      {
        id: 'm4',
        type: 'ai', 
        content: 'Absolutely! I\'d be happy to help you translate English text to Urdu. Please share the text you\'d like me to translate, and I\'ll provide you with an accurate Urdu translation.\n\nUrdu (اردو) is a beautiful language with rich literary traditions. Whether it\'s simple phrases, technical content, or creative writing, I can assist with translations while maintaining the meaning and context.',
        timestamp: '2025-01-22T15:46:00Z'
      }
    ]
  },
  {
    id: '3', 
    title: 'AI tool development',
    timestamp: '2025-01-21T09:20:00Z',
    messages: [
      {
        id: 'm5',
        type: 'user',
        content: 'What are the best practices for developing AI-powered tools?',
        timestamp: '2025-01-21T09:20:00Z'
      },
      {
        id: 'm6',
        type: 'ai',
        content: 'Here are key best practices for developing AI-powered tools:\n\n**1. User-Centric Design**\n- Start with clear problem definition\n- Focus on user experience over technical complexity\n- Provide transparent AI behavior and limitations\n\n**2. Data Quality & Privacy**\n- Ensure high-quality, diverse training data\n- Implement robust data privacy measures\n- Handle sensitive information responsibly\n\n**3. Model Performance**\n- Regular model evaluation and monitoring\n- A/B testing for feature improvements\n- Fallback mechanisms for edge cases\n\n**4. Ethical Considerations**\n- Bias detection and mitigation\n- Fair and inclusive AI behavior\n- Clear terms of use and limitations\n\n**5. Technical Implementation**\n- Scalable architecture design\n- Proper error handling and logging\n- Performance optimization\n- Regular security audits',
        timestamp: '2025-01-21T09:22:00Z'
      }
    ]
  }
];

export const customTools = [
  {
    id: 'prompt-writer',
    name: 'Prompt Writer',
    icon: 'PenTool',
    description: 'Help create effective AI prompts',
    category: 'Writing'
  },
  {
    id: 'voice-chat',
    name: 'Voice Chat', 
    icon: 'Mic',
    description: 'Speech-to-text conversation',
    category: 'Communication'
  },
  {
    id: 'code-helper',
    name: 'Code Helper',
    icon: 'Code',
    description: 'Programming assistance and debugging',
    category: 'Development'
  },
  {
    id: 'translator',
    name: 'Translator',
    icon: 'Languages',
    description: 'Multi-language translation',
    category: 'Language'
  }
];

export const welcomeMessage = {
  id: 'welcome',
  type: 'ai',
  content: 'Hello! I\'m your AI assistant. How can I help you today?',
  timestamp: new Date().toISOString()
};