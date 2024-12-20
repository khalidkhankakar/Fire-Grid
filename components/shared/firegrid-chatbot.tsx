"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {  UserRound, Send, Loader, } from "lucide-react";
import Image from "next/image";

export default function FiregridChatbot() {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat();

  const noMessages = !messages || messages.length === 0;

  const [isShow, setIsShow] = useState(false);

  const botRef = useRef<HTMLDivElement>(null);


  const handleButtonClick = () => {
    setIsShow((prev) => !prev);


    if (!isShow) {
      botRef.current?.classList.add("no-pointer-events");
      setTimeout(() => {
        botRef.current?.classList.remove("no-pointer-events");
      }, 100);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        botRef.current &&
        event.target instanceof Element && // Ensure event.target is a DOM node
        !botRef.current.contains(event.target) && // Click outside the chatbot
        !event.target.closest(".chatbot-toggle-button")
      ) {
        setIsShow(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  return (
    <main className="z-50">
      <Button
        variant={'icon-active'}
        size={'icon'}
        onClick={(e) => {
          e.stopPropagation();
          handleButtonClick();
        }}
        className="fixed z-50 bottom-16 md:bottom-10 right-6 chatbot-toggle-button"
      >
        <Image src={'/botIcon.png'} width={40} height={40} alt="botIcon" className="object-contain" />
      </Button>

      <div ref={botRef} style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
        className={`fixed ${isShow ? 'block' : 'hidden'}  bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white dark:bg-dark-2 z-50 p-3 rounded-lg shadow-xl w-[90%] max-w-[400px] h-[500px]`}>


        <div className="flex flex-col space-y-1.5 pb-2">
          <h2 className="font-semibold text-lg tracking-tight">Firegrid</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by FireGrid</p>
        </div>

        {noMessages ? <div className="pr-4 flex items-center gap-y-2 justify-center flex-col overflow-y-auto h-[360px]" style={{ minWidth: '100%' }}>
          <Image src={'/bot.png'} width={200} height={200} className="object-contain h-40 w-40" alt="bot" />
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
                  <p className="leading-relaxed  text-gray-700 dark:text-slate-300"><span className="block font-bold">You</span>
                    {message.content}
                  </p>
                </div>
              ) : (
                <div key={message.id} className="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                  className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-600 border p-1">
                    <Image src={'/botIcon.png'} width={40} height={40} alt="botIcon" className="object-contain" />
                  </div>
                </span>
                  <p className="leading-relaxed text-gray-700 dark:text-slate-300"><span className="block font-bold ">Firegrid</span>{message.content}</p>
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