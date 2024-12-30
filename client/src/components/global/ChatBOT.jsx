// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ChevronLeft,
//   MoreVertical,
//   Send,
//   Loader2,
//   Repeat2,
// } from 'lucide-react';

// const PUBLIC_CHATBOT_API_URL =
//   process.env.PUBLIC_CHATBOT_API_URL || 'http://localhost:5000/api';
// console.log('PUBLIC_CHATBOT_API_URL: ', PUBLIC_CHATBOT_API_URL);

// export default function AdminChatBOT() {
//   const chatVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: 'easeOut' },
//     },
//   };

//   const messageVariants = {
//     initial: { opacity: 0, x: 30 },
//     animate: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.3, ease: 'easeOut' },
//     },
//   };

//   const inputVariants = {
//     initial: { y: 20, opacity: 0 },
//     animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
//   };

//   const [messages, setMessages] = useState([
//     {
//       role: 'system',
//       content:
//         "I'm Pandora, your Personal Therapeutic AI Assistant. How are you feeling today?",
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [languages, setLanguages] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [error, setError] = useState('');
//   const chatEndRef = useRef(null);
//   const [showFullResponse, setShowFullResponse] = useState(false); // Toggle for JSON display
//   const chatContainerRef = useRef(null);

//   // Scroll to the bottom of the chat
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Fetch available languages from backend
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await fetch(
//           `${PUBLIC_CHATBOT_API_URL}/supported_languages`
//         );
//         const data = await response.json();
//         console.log('Languages data:', data.languages); // Log to confirm data structure
//         setLanguages(data.languages || []);
//       } catch (err) {
//         console.error('Error fetching languages:', err);
//         setError('Failed to fetch languages.');
//       }
//     };
//     fetchLanguages();
//   }, []);

//   // Send message to backend
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, newMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await fetch(`${PUBLIC_CHATBOT_API_URL}/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_input: input,
//           language_code: selectedLanguage,
//         }),
//       });
//       const data = await response.json();
//       console.log('Response data:', data);

//       if (data.error) {
//         setError(data.error || 'Something went wrong.');
//       } else {
//         setMessages(prev => [
//           ...prev,
//           { role: 'assistant', content: data.response },
//         ]);
//       }
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setError('Failed to send message.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Enter key press to send message
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && !loading) sendMessage();
//   };

//   // Clear chat history
//   const clearChat = () => {
//     setMessages([
//       {
//         role: 'system',
//         content:
//           "I'm Pandora, your Personal Therapeutic AI Assistant. How are you feeling today?",
//       },
//     ]);
//   };

//   return (
//     <div className="">
//       <div className="h-screen inset-0 rounded-xl bg-slate-300 md:bg-slate-300 p-0 text-white flex flex-col max-w-md mx-auto">
//         {/* Header */}
//         <div className="bg-gray-700 rounded-t-xl">
//           <header className="flex items-center justify-between px-3 py-2 border-b border-gray-800 sm:px-4 sm:py-3">
//             <h1 className="text-xl font-semibold sm:text-2xl">Pandora</h1>
//             {/* Clear chat button */}
//             <button
//               onClick={clearChat}
//               className="inline-flex items-center px-2 py-2 text-sm font-medium text-white rounded-lg glass-panel disabled:cursor-not-allowed"
//             >
//               <Repeat2 className="text-shadow shadow-2xl" />
//             </button>
//           </header>
//           <div className="my-1 flex flex-col items-center">
//             <label htmlFor="modelSelect" className="text-xxs">
//               Select The Language You Want:
//             </label>

//             <select
//               id="languageSelect"
//               value={selectedLanguage}
//               onChange={e => setSelectedLanguage(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs text-[0.55rem] rounded focus:ring-blue-500 focus:border-blue-500 block sm:w-[55%] w-[50%] px-1 py-[0.0.2rem] dark:bg-gray-10 dark:text-gray-700 font-semibold focus:outline-none transform duration-slow dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             >
//               {languages.map(lang => (
//                 <option key={lang.code} value={lang.code}>
//                   {lang.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div
//           ref={chatContainerRef}
//           onWheel={e => {
//             e.stopPropagation();
//           }}
//           className="flex-1 overflow-y-auto mockupScroll p-3 space-y-3 sm:p-4 sm:space-y-4"
//         >
//           {messages.map((msg, index) => (
//             <div key={index}>
//               <div className="mt-5 p-1">
//                 {msg.role === 'user' ? (
//                   <div className="flex items-start justify-end space-x-2 sm:space-x-3">
//                     <div className="flex flex-col space-y-1 max-w-[85%] sm:max-w-[80%]">
//                       <div className="bg-blue-600 rounded-2xl p-2 text-xs sm:p-3 sm:text-sm">
//                         {msg.content}
//                       </div>
//                       <span className="text-[10px] text-gray-800 font-bold sm:text-xs">
//                         You
//                       </span>
//                     </div>
//                     <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center sm:w-8 sm:h-8">
//                       <div className="w-4 h-4 text-white sm:w-5 sm:h-5">👤</div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-start space-x-2 sm:space-x-3">
//                     <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center sm:w-8 sm:h-8">
//                       <div className="w-4 h-4 text-white sm:w-5 sm:h-5">🤖</div>
//                     </div>
//                     <div className="flex flex-col space-y-1 max-w-[85%] sm:max-w-[80%]">
//                       <div className="bg-gray-800 rounded-2xl p-2 text-xs sm:p-3 sm:text-sm">
//                         {msg.content || 'No data available.'}
//                       </div>
//                       <div className="flex items-center justify-end">
//                         <span className="text-[10px] text-gray-800 font-bold sm:text-xs">
//                           Pandora
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           {/* Generating */}
//           {loading && (
//             <div className="flex justify-center">
//               <button className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center space-x-1.5 text-xs sm:px-4 sm:py-1.5 sm:space-x-2 sm:text-sm">
//                 <span className="w-1.5 h-1.5 bg-purple-500 rounded-full sm:w-2 sm:h-2"></span>
//                 <span>Generating Response</span>

//                 <Loader2 className="animate-spin" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="p-3 border-t border-gray-800 sm:p-4">
//           <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1.5 sm:p-2 resize-y">
//             <input
//               type="text"
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-grow border text-black border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Type your message..."
//               disabled={loading}
//             />

//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="p-1.5 bg-purple-500 rounded sm:p-2"
//             >
//               <Send className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//           </div>
//           <div className="text-center mt-2 text-[10px] text-gray-400 sm:text-xs">
//             Pandora can make mistakes. Consider checking important information.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import { Send, Loader2, Repeat2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const apiUrl = process.env.PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ChatBOT() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: {
        data: `I'm Pandora,\n your Personal Mental Wellness Assistant from ElevateMind.\n How are you feeling today? 😊`,
        message: 'Welcome Message',
        model: null,
        success: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput('');

    const userMessage = {
      role: 'user',
      content: {
        data: input,
        timestamp: new Date().toLocaleTimeString(),
      },
    };
    setMessages(prev => [...prev, userMessage]); // Add user message to chat
    setLoading(true);

    try {
      // API call to backend
      const response = await fetch(`${apiUrl}/bot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: responseData, // Store the entire JSON response
          },
        ]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: {
            data: null,
            message: `Error: ${responseData.message || 'Something went wrong.'}`,
            success: false,
            timestamp: new Date().toLocaleTimeString(),
          },
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: {
            data: null,
            message:
              'Error: Unable to connect to the server. Please try again later.',
            success: false,
            timestamp: new Date().toLocaleTimeString(),
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear All Chat History
  const handleClearAll = async () => {
    try {
      const response = await fetch(`${apiUrl}/bot/clearall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message); // Debug message: Chat history cleared.
        setMessages([]); // Clear chat messages on the frontend
      } else {
        console.error('Failed to clear chat history.');
      }
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className="h-screen rounded-xl bg-slate-300 md:bg-slate-300 p-0 text-white flex flex-col max-w-md mx-auto">
        {/* Header */}

        <div className="bg-gray-700 rounded-t-xl">
          <header className="flex items-center justify-between px-3 py-2 border-b border-gray-800 sm:px-4 sm:py-3">
            <h1 className="text-xl font-semibold sm:text-2xl">Pandora</h1>
            {/* <button className="p-1 hover:bg-gray-800 rounded-full sm:p-2">
              <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
            </button> */}
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center px-2 py-2 text-sm font-medium text-white  rounded-lg glass-panel disabled:cursor-not-allowed"
            >
              <Repeat2 className="text-shadow shadow-2xl" />
            </button>
          </header>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          onWheel={e => {
            e.stopPropagation();
          }}
          className="flex-1 overflow-y-auto mockupScroll p-3 space-y-3 sm:p-4 sm:space-y-4"
        >
          {messages.map((msg, index) => (
            <div key={index}>
              <div className="mt-5 p-1">
                {msg.role === 'user' ? (
                  <div className="flex items-start justify-end space-x-2 sm:space-x-3">
                    <div className="flex flex-col space-y-1 max-w-[85%] sm:max-w-[80%]">
                      <div className="bg-blue-600 rounded-2xl p-2 text-xs sm:p-3 sm:text-sm">
                        {msg.content.data}
                      </div>
                      <span className="text-[10px] text-gray-800  font-bold sm:text-xs">
                        You
                        <span className="text-[10px] ml-2 text-gray-800  font-bold sm:text-xs">
                          {msg.content.timestamp}
                        </span>
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center sm:w-8 sm:h-8">
                      <div >👤</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center sm:w-8 sm:h-8">
                      <div >🤖</div>
                    </div>
                    <div className="flex flex-col space-y-1 max-w-[85%] sm:max-w-[80%]">
                      <div className="bg-gray-800 rounded-2xl p-2 text-xs sm:p-3 sm:text-sm">
                        <ReactMarkdown
                          components={{
                            img: ({ node, ...props }) => {
                              const [isLoading, setIsLoading] =
                                React.useState(true);
                              return (
                                <>
                                  {isLoading && (
                                    <div className="w-full h-full flex items-center justify-center">
                                      Generating...{' '}
                                      <Loader2 className="animate-spin" />
                                    </div>
                                  )}
                                  <img
                                    {...props}
                                    alt="Generated Image"
                                    className={`${isLoading ? 'hidden' : 'block'} w-full my-2 h-full rounded`}
                                    onLoad={() => setIsLoading(false)}
                                  />
                                </>
                              );
                            },
                          }}
                        >
                          {msg.content.data || 'No data available.'}
                        </ReactMarkdown>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="text-[10px] text-gray-800  font-bold sm:text-xs">
                          Pandora
                          <span className="text-[10px] ml-2 text-gray-800  font-bold sm:text-xs">
                            {msg.content.timestamp}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/*  Generating */}
          {loading && (
            <div className="flex justify-center">
              <button className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center space-x-1.5 text-xs sm:px-4 sm:py-1.5 sm:space-x-2 sm:text-sm">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full sm:w-2 sm:h-2"></span>
                <span>Generating Response</span>

                <Loader2 className="animate-spin" />
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-800 sm:p-4">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1.5 sm:p-2 resize-y">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder="Ask me anything.."
              className="flex-1 pl-2 bg-transparent outline-none text-xs sm:text-sm "
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-1.5 bg-purple-500 rounded sm:p-2"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-gray-400 sm:text-xs">
            Pandora can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  );
}
