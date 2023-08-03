"use client";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChatBody } from "@/components/ChatBody";
import { InputToolbar } from "@/components/InputToolbar";
import { UserToolbar } from "@/components/UserToolbar";
import ModelMenu from "@/components/ModelMenu";
import ModelDetail from "@/components/ModelDetail";
import { Product } from "@/models/Product";
import { useStore } from "../../models/RootStore";
import { ChatBlankState } from "@/components/ChatBlankState";
import { observer } from "mobx-react-lite";
import Gleap from "gleap";
import ConfirmDeleteConversationModal from "../ConfirmDeleteConversationModal";
import { RemoteConfigKeys, useRemoteConfig } from "@/hooks/useRemoteConfig";
import ConversationSideBar from "../ConversationSideBar";
import Header from "../Header";
import LoginModal from "../Auth/LoginModal";
import Profile from "../Auth/Profile";
import SettingsModal from "../Settings/SettingsModal";

interface IChatContainerProps {
  products: Product[];
}

const ChatContainer: React.FC<IChatContainerProps> = observer((props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prefillPrompt, setPrefillPrompt] = useState("");
  const { historyStore } = useStore();
  const showBodyChat = historyStore.activeConversationId != null;
  const [heightChat, setHeightChat] = useState(0);

  const { getConfig } = useRemoteConfig();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [open, setOpen] = useState(false);

  const products = getConfig(RemoteConfigKeys.ENABLE_OFFLINE_MODEL)
    ? props.products
    : props.products.filter(
        (e) => e.action?.params?.models[0]?.offline !== true
      );

  const conversation = historyStore.getActiveConversation();

  useEffect(() => {
    if (conversation) {
      Gleap.showFeedbackButton(false);
    } else {
      Gleap.showFeedbackButton(true);
    }
  }, [conversation]);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  // On/Off Setting Modal
  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingModal);
  };

  // Open once user click to avatar on Header
  const openSettingModal = () => {
    setShowProfileModal(true);
  };

  // Called once your click to the exit button
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  // Called once user click logout from menu or profile page
  const logoutCallBack = () => {
    closeProfileModal();
    toggleSettingsModal();
  };

  const onConfirmDelete = () => {
    setPrefillPrompt("");
    historyStore.closeModelDetail();
    historyStore.deleteActiveConversation();
    setOpen(false);
  };

  const onSuggestPromptClick = (prompt: string) => {
    if (prompt !== prefillPrompt) {
      setPrefillPrompt(prompt);
    }
  };

  return (
    <div className="flex flex-row flex-1 w-full">
      <ConfirmDeleteConversationModal
        open={open}
        setOpen={setOpen}
        onConfirmDelete={onConfirmDelete}
      />
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

      <ConversationSideBar />

      <LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
      <SettingsModal
        isOpen={showSettingModal}
        openSettingFunc={openSettingModal}
        logoutCallBack={logoutCallBack}
      />
      <Profile
        isOpen={showProfileModal}
        closeProfileFunc={closeProfileModal}
        logoutCallBack={logoutCallBack}
      />

      {showBodyChat ? (
        <div className="flex-1 flex flex-col w-full">
          <Header
            handleClickLogin={toggleLoginModal}
            toggleDisplaySettingMenu={toggleSettingsModal}
          />
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
              <UserToolbar />
              <ModelMenu onDeleteClick={() => setOpen(true)} />
            </div>
          </div>

          {/* Your content */}
          <main className="py-3 w-full h-full">
            <div className="flex flex-col h-full px-1 sm:px-2 lg:px-3">
              <ChatBody chatHeight={heightChat} />
              <InputToolbar
                callback={(value) => setHeightChat(value)}
                prefillPrompt={prefillPrompt}
              />
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          <ChatBlankState products={products} />
        </div>
      )}
      <div>
        <ModelDetail onPromptClick={onSuggestPromptClick} />
      </div>
    </div>
  );
});

export default ChatContainer;
