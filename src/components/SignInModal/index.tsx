import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SignInModal: React.FC<Props> = ({ open, setOpen }) => {
  const { signInWithGoole } = useGoogleSignIn();

  const onSignInWithGoogleClick = () => {
    signInWithGoole(() => {
      setOpen(false);
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center">
                    <Image
                      src="/icons/janai_logo.svg"
                      alt={""}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Login to continue
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    className="text-sm flex items-center justify-center h-10 w-full py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100"
                    onClick={onSignInWithGoogleClick}
                  >
                    <Image
                      className="w-6 h-6 mr-2"
                      src="/icons/social_icon_google.svg"
                      alt="Google Logo"
                      width={180}
                      height={37}
                      priority
                      style={{ objectFit: "contain" }}
                    />
                    Continue with Google
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.memo(SignInModal);
