import React, { useState } from 'react';
import { Plus, MessageCircle, ChevronDown, ChevronRight, Settings, Moon, Sun, User, PenTool, Mic, Code, Languages, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const Sidebar = ({ 
  conversations, 
  activeConversationId, 
  collapsed, 
  customTools, 
  onNewChat, 
  onSelectConversation,
  onToggleCollapse,
  darkMode,
  onToggleDarkMode
}) => {
  const [toolsExpanded, setToolsExpanded] = useState(false);
  
  const getIcon = (iconName) => {
    const icons = {
      PenTool: PenTool,
      Mic: Mic, 
      Code: Code,
      Languages: Languages
    };
    const IconComponent = icons[iconName] || MessageCircle;
    return IconComponent;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (collapsed) {
    return (
      <div className="w-12 bg-[#171717] flex flex-col items-center py-4 border-r border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-gray-300 hover:text-white hover:bg-gray-700 mb-4"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" 
          size="icon"
          onClick={onNewChat}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#171717] flex flex-col h-full border-r border-gray-800">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <h1 className="text-white text-lg font-semibold">ChatGPT</h1>
        </div>
        
        <Button
          onClick={onNewChat}
          className="w-full bg-transparent border border-gray-600 text-white hover:bg-gray-700 rounded-lg py-3 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full justify-start text-left p-3 rounded-lg transition-colors ${
                activeConversationId === conversation.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 w-full min-w-0">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTime(conversation.timestamp)}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Tools Section */}
      <div className="px-4 py-2 border-t border-gray-800">
        <Collapsible open={toolsExpanded} onOpenChange={setToolsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 p-2"
            >
              <div className="flex items-center gap-2">
                {toolsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-medium">Custom Tools</span>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-2">
            {customTools.map((tool) => {
              const IconComponent = getIcon(tool.icon);
              return (
                <Button
                  key={tool.id}
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700 py-2 px-3"
                >
                  <IconComponent className="h-4 w-4 mr-3" />
                  <span className="text-sm">{tool.name}</span>
                </Button>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-500 hover:text-gray-300 py-2 px-3"
              disabled
            >
              <MoreHorizontal className="h-4 w-4 mr-3" />
              <span className="text-sm">More Tools (coming soon)</span>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Button
          variant="ghost"
          onClick={onToggleDarkMode}
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          {darkMode ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <User className="h-4 w-4 mr-3" />
          Profile
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;