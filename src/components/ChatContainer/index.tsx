"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChatBody } from "@/components/ChatBody";
import { InputToolbar } from "@/components/InputToolbar";
import { UserToolbar } from "@/components/UserToolbar";
import ShortcutList from "@/components/ShortcutList";
import HistoryList from "@/components/HistoryList";
import SearchBar from "@/components/SearchBar";
import ModelMenu from "@/components/ModelMenu";
import ModelDetail from "@/components/ModelDetail";
import { Product } from "@/models/Product";
import avatar from "@/assets/Thumbnail02.png";
import MobileDownload from "@/components/MobileDownload";
import { useStore } from "../../models/RootStore";
import { ChatBlankState } from "@/components/ChatBlankState";
import { observer } from "mobx-react-lite";

interface IChatContainerProps {
  products: Product[];
}

const ChatContainer: React.FC<IChatContainerProps> = observer((props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModelDetail, setShowModelDetail] = useState(false);
  const { historyStore } = useStore();

  useEffect(() => {
    historyStore.createTestConversation();
  }, []);

  const showBodyChat = historyStore.activeConversationId != null;

  const data = {
    avatar: avatar.src,
    name: "Guanaco",
  };

  const onShortcutClicked = (modelId: string): void => {};

  const onHistoryClicked = (conversationId: string): void => {};

  return (
    <div className="flex flex-row flex-1 w-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      src="/icons/app_icon.svg"
                      width={32}
                      height={32}
                      alt="Your Company"
                    />
                    <span className="">Jan</span>
                  </div>
                  <nav className="flex flex-1 flex-col"></nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:inset-y-0 lg:flex lg:w-72 lg:flex-col overflow-hidden">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-2">
          <div className="flex flex-col h-16 shrink-0 items-center gap-[10px] pt-1">
            <SearchBar />
            <ShortcutList
              products={props.products}
              onShortcutClicked={onShortcutClicked}
            />
            <HistoryList onHistoryClicked={onHistoryClicked} />
          </div>
          <nav className="flex flex-1 flex-col"></nav>
          <MobileDownload />
        </div>
      </div>

      {showBodyChat ? (
        <div className="flex-1 flex flex-col w-full">
          <div className="flex h-16 w-full shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex justify-between flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <UserToolbar {...data} />
              <ModelMenu
                showModelDetail={showModelDetail}
                onModelInfoClick={() => setShowModelDetail(!showModelDetail)}
              />
            </div>
          </div>

          {/* Your content */}
          <main className="py-5 w-full h-full">
            <div className="flex flex-col h-full px-1 sm:px-2 lg:px-3">
              <ChatBody />
              <InputToolbar />
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          <ChatBlankState />
        </div>
      )}
      <div>
        <ModelDetail hidden={showModelDetail} />
      </div>
    </div>
  );
});

export default ChatContainer;
