
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, SendHorizontal, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const LegalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm your AI legal assistant. Ask me any legal question and I'll try to provide helpful information. Remember, I offer general information, not legal advice.",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Include both system prompt and conversation history
      const systemPrompt = "You are a helpful legal assistant that provides general information about legal concepts, history, and principles. You do NOT provide legal advice and should clarify this in your responses when appropriate. Keep your responses concise and educational. If you don't know something, admit it rather than making up information.";
      
      // Format the previous messages for context
      const conversationHistory = messages
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.type === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));
      
      // Prepare the chat
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
      
      // Get response
      const result = await chat.sendMessage(systemPrompt + "\n\nUser query: " + currentMessage);
      const responseText = result.response.text();
      
      // Add assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        type: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please try again.");
      
      // Add error message
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        type: "assistant",
        content: "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === "user"
                    ? "bg-green-100 text-gray-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-xs font-medium">
                    {message.type === "user" ? "You" : "Legal Assistant"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-2 flex gap-2">
        <Input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a legal question..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading || !currentMessage.trim()}
          className="bg-green-500 hover:bg-green-600"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
      <div className="bg-gray-50 text-xs text-gray-500 p-2 text-center">
        <p>Remember: This provides general information, not legal advice.</p>
      </div>
    </div>
  );
};

export default LegalChatbot;
