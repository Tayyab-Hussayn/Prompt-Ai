import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Plus, Send, Mic, Settings, Moon, Sun, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { mockConversations, customTools, welcomeMessage } from '../data/mockData';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import InputArea from './InputArea';

const ChatInterface = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = activeConversationId 
    ? conversations.find(conv => conv.id === activeConversationId)
    : null;

  const handleNewChat = () => {
    setActiveConversationId(null);
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // If no active conversation, create a new one
    if (!activeConversationId) {
      const newConversationId = `conv_${Date.now()}`;
      const newConversation = {
        id: newConversationId,
        title: message.length > 50 ? message.substring(0, 50) + '...' : message,
        timestamp: new Date().toISOString(),
        messages: [
          {
            id: `msg_${Date.now()}`,
            type: 'user',
            content: message,
            timestamp: new Date().toISOString()
          }
        ]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversationId);
      setIsLoading(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: `msg_${Date.now() + 1}`,
          type: 'ai',
          content: 'This is a mock AI response. In the full version, this would connect to a real AI model to provide intelligent responses to your questions.',
          timestamp: new Date().toISOString()
        };
        
        setConversations(prev => prev.map(conv => 
          conv.id === newConversationId 
            ? { ...conv, messages: [...conv.messages, aiResponse] }
            : conv
        ));
        setIsLoading(false);
      }, 1500);
    } else {
      // Add message to existing conversation
      const userMessage = {
        id: `msg_${Date.now()}`,
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, userMessage],
              timestamp: new Date().toISOString()
            }
          : conv
      ));
      
      setIsLoading(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: `msg_${Date.now() + 1}`,
          type: 'ai',
          content: 'This is a mock AI response. In the full version, this would connect to a real AI model to provide intelligent responses to your questions.',
          timestamp: new Date().toISOString()
        };
        
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? { ...conv, messages: [...conv.messages, aiResponse] }
            : conv
        ));
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex w-full bg-white dark:bg-[#212121]">
        {/* Sidebar */}
        <Sidebar 
          conversations={conversations}
          activeConversationId={activeConversationId}
          collapsed={sidebarCollapsed}
          customTools={customTools}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <ChatArea 
            conversation={activeConversation}
            isLoading={isLoading}
            welcomeMessage={welcomeMessage}
          />
          
          {/* Input Area */}
          <InputArea 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;