import React, { useEffect, useRef } from 'react';
import { User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4">
    <Avatar className="w-8 h-8">
      <AvatarFallback className="bg-[#19c37d] text-white">
        <Bot className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

const Message = ({ message, showTimestamp }) => {
  const isUser = message.type === 'user';
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`group flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}>
      {/* Avatar */}
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={isUser ? "bg-blue-600 text-white" : "bg-[#19c37d] text-white"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-white">
            {isUser ? 'You' : 'ChatGPT'}
          </span>
          {showTimestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTime(message.timestamp)}
            </span>
          )}
        </div>
        <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ welcomeMessage }) => (
  <div className="flex-1 flex items-center justify-center p-8">
    <div className="text-center max-w-2xl">
      <div className="mb-8">
        <div className="w-16 h-16 bg-[#19c37d] rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          How can I help you today?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {welcomeMessage.content}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 text-left">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Get Creative</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Generate ideas, write content, or brainstorm solutions
          </p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🔧 Code & Debug</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Write code, debug issues, or learn programming concepts
          </p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Learn & Research</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get explanations, research topics, or learn new skills
          </p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🌐 Translate & Write</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Translate languages or help with writing tasks
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ChatArea = ({ conversation, isLoading, welcomeMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isLoading]);

  if (!conversation) {
    return <WelcomeScreen welcomeMessage={welcomeMessage} />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {conversation.messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            showTimestamp={true}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;