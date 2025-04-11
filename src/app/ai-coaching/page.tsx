'use client';

import {useState, useEffect} from 'react';
import {providePersonalizedTips} from '@/ai/flows/provide-personalized-tips';
import {chat} from '@/ai/flows/chat-flow';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';

export default function AICoaching() {
  const [tip, setTip] = useState('');
  const [encouragement, setEncouragement] = useState('');
  const [chatMessages, setChatMessages] = useState<
    {text: string; isUser: boolean}[]
  >([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchTips = async () => {
      const input = {
        habitName: 'Drink Water',
        progressPercentage: 60,
        streakLength: 5,
        challenges: 'Forgetting to drink water during work.',
      };

      try {
        const response = await providePersonalizedTips(input);
        setTip(response.tip);
        setEncouragement(response.encouragement);
      } catch (error) {
        console.error('Error fetching AI tips:', error);
        setTip('Failed to load tip.');
        setEncouragement('Failed to load encouragement.');
      }
    };

    fetchTips();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    setChatMessages(prevMessages => [
      ...prevMessages,
      {text: newMessage, isUser: true},
    ]);

    try {
      const response = await chat({message: newMessage});
      setChatMessages(prevMessages => [
        ...prevMessages,
        {text: response.response, isUser: false},
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prevMessages => [
        ...prevMessages,
        {
          text: 'Failed to send message. Please try again.',
          isUser: false,
        },
      ]);
    }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">AI Coaching</h1>

        <p className="mt-3 text-2xl">
          Get personalized tips and encouragement from our AI coach.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Today's Tip</h2>
          <p className="mt-2">{tip}</p>

          <h2 className="text-2xl font-semibold mt-4">Encouragement</h2>
          <p className="mt-2">{encouragement}</p>
        </div>

        {/* Chat Interface */}
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold">Chat with AI Coach</h2>
          <div className="flex flex-col space-y-2">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`text-left p-2 rounded-lg ${
                  message.isUser ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex mt-2 space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
