import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const InputArea = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    // Max 4 lines (approximately 96px)
    textarea.style.height = Math.min(scrollHeight, 96) + 'px';
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Mock voice recording functionality
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessage(prev => prev + (prev ? ' ' : '') + 'This is mock voice input text.');
      }, 2000);
    }
  };

  const characterCount = message.length;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212121]">
      <div className="max-w-4xl mx-auto p-4">
        {/* Tool Selector (placeholder) */}
        <div className="mb-3 flex items-center gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ChatGPT can make mistakes. Check important info.
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2 p-3 bg-gray-100 dark:bg-[#2f2f2f] rounded-2xl border border-gray-200 dark:border-gray-600 focus-within:border-[#19c37d] transition-colors">
            {/* Voice Recording Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleVoiceToggle}
              disabled={disabled}
              className={`flex-shrink-0 w-8 h-8 ${
                isRecording 
                  ? 'text-red-500 hover:text-red-600 animate-pulse' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            {/* Text Input */}
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              disabled={disabled}
              className="flex-1 min-h-[24px] max-h-24 resize-none border-0 bg-transparent focus:ring-0 focus:ring-offset-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base leading-6"
              rows="1"
            />

            {/* Send Button */}
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || disabled}
              className="flex-shrink-0 w-8 h-8 bg-[#19c37d] hover:bg-[#16a068] disabled:bg-gray-300 dark:disabled:bg-gray-600 rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Character Counter */}
          {characterCount > 0 && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
              {characterCount} characters
            </div>
          )}
        </form>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Recording... Click to stop
          </div>
        )}
      </div>
    </div>
  );
};

export default InputArea;