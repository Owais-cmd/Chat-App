import { useClient } from '../store/useClient.js';
import { useParams } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import { ScrollContainer } from '../components/ScrollChat.jsx';

const messages = [
  { id: 1, user: 'Alice', text: 'Hello!', time: '10:00 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 3, user: 'Alice', text: 'How are you?', time: '10:02 AM' },
  { id: 4, user: 'Bob', text: 'I am good, thanks! And you?', time: '10:03 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'Bob', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'ow', text: 'Hi Alice!', time: '10:01 AM' },
  { id: 2, user: 'ow', text: 'Hi Alice!', time: '10:01 AM' },
]

export const ChatPage = () => {
  const { id } = useParams();
  const messageEndRef = useRef(null);
  const { name, roomId } = useClient();

  console.log(name, roomId);

 

  return (

    <div className="relative h-screen">

      <div className="absolute inset-0">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_120%)]"></div>
      </div>


      <div className="flex flex-col w-3/4 mx-auto pt-6 h-full">
  <h1 className="text-lg text-slate-700">Room No : {roomId}</h1>

  <ScrollContainer>
    {messages.map((message) => (
      <div
        key={message.id}
        className={`chat ${message.user === name ? 'chat-end' : 'chat-start'}`}
      >
        <div className="chat-header text-sky-700">{message.user}</div>
        <div className="chat-bubble bg-sky-800">{message.text}</div>
      </div>
    ))}
    </ScrollContainer>

  <div className="w-full flex justify-center items-center mt-4 gap-4">
    <input
      type="text"
      placeholder="Type here"
      className="input w-3/4 dark:bg-gray-100 text-slate-700 shadow-md"
    />
    <button className="rounded-lg px-4 py-2 font-medium bg-sky-900 text-white hover:bg-sky-800">
      Send
    </button>
  </div>
</div>

    </div>
  )
}

