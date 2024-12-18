"use client";
import { useChat } from "ai/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Bot, Brain, UserRound, Send, Loader, } from "lucide-react";
import { Input } from "../ui/input";

export default function FiregridChatbot() {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat();

  const noMessages = !messages || messages.length === 0;

  const [isShow, setIsShow] = useState(false);



  return (
    <main className="z-50">
      <Button
        variant={'icon-active'}
        size={'icon'}
        onClick={() => setIsShow(!isShow)}
        className="fixed z-50 bottom-16 md:bottom-10 right-6 "
      >
        <Bot className="w-12 h-12 " />
      </Button>

      <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
        className={`fixed ${isShow ? 'block' : 'hidden'}  bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white dark:bg-dark-2 z-50 p-3 rounded-lg shadow-xl w-[90%] max-w-[400px] h-[500px]`}>


        <div className="flex flex-col space-y-1.5 pb-2">
          <h2 className="font-semibold text-lg tracking-tight">Firegrid</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by FireGrid</p>
        </div>

        {noMessages ? <div className="pr-4 flex items-center gap-y-4 justify-center flex-col overflow-y-auto h-[360px]" style={{ minWidth: '100%' }}>
          <Brain className="w-12 h-12" />
          <p className="text-sm text-center">I am your FireGrid AI assistant. Ask me anything about FireGrid</p>
        </div> :

          <div className="pr-4 overflow-y-auto h-[360px]" style={{ minWidth: '100%' }}>

            {messages.map((message) => (
              message.role === "user" ? (
                <div key={message.id} className="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                  className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <UserRound />
                  </div>
                </span>
                  <p className="leading-relaxed"><span className="block font-bold text-gray-700">You</span>
                    {message.content}
                  </p>
                </div>
              ) : (
                <div key={message.id} className="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                  className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <Brain />
                  </div>
                </span>
                  <p className="leading-relaxed"><span className="block font-bold text-gray-700">Firegrid</span>{message.content}</p>
                </div>
              )
            ))}
          </div>

        }

        <div className="flex items-center pt-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex items-center justify-center w-full space-x-2">
            <Input disabled={isLoading} placeholder="Ask from Firegrid..." value={input} onChange={handleInputChange} />
            <Button disabled={isLoading} type="submit">

              {
                isLoading ? (
                  <Loader className="animate-spin" />
                )
                  : <Send />
              }
            </Button>
          </form>
        </div>

      </div>
    </main>
  );
}