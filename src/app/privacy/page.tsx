import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy - Jan.ai",
  description: "Privacy",
};

const Page: React.FC = () => {
  return (
    <div className="relative flex flex-col text-black items-center h-screen overflow-y-scroll scroll pt-2">
      <div className="absolute top-3 left-5">
        <Link href="/" className="flex flex-row gap-2">
          <div className="flex gap-[2px] items-center">
            <Image src={"/icons/app_icon.svg"} width={28} height={28} alt="" />
            <Image src={"/icons/Jan.svg"} width={27} height={12} alt="" />
          </div>
        </Link>
      </div>
      <article className="prose lg:prose-xl w-full my-20">
        <h1>Privacy Policy </h1>
        <p>
          Jan is committed to protecting your privacy and ensuring that your
          personal information is handled in a safe and responsible way. This
          policy outlines how we collect, store, and use your personal
          information when you use our mobile application.
        </p>
        <h2>Data Collection and Usage</h2>
        <p>
          When you use Jan, we may collect certain information about you,
          including your name, email address, and other personal information
          that you provide to us. We use this information to provide you with
          the best possible experience when using our app.
        </p>
        <p>
          We may also collect certain non-personal information, such as your
          device type, operating system, and app usage data. This information is
          used to improve our app and to provide you with a better user
          experience.
        </p>
        <h2>Data Sharing</h2>
        <p>
          We do not share your personal information with third parties except as
          required by law or as necessary to provide you with the services you
          have requested. We may share non-personal information with third
          parties for the purpose of improving our app and providing you with a
          better user experience.
        </p>
        <h2>Data Security</h2>
        <p>
          We take the security of your personal information seriously and have
          implemented appropriate technical and organizational measures to
          protect your personal information from unauthorized access,
          disclosure, or misuse.
        </p>
        <h2>Your Choices</h2>
        <p>
          You have the right to access, update, and delete your personal
          information at any time. You may also opt-out of receiving marketing
          communications from us by following the unsubscribe link included in
          our emails.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy policy, please
          contact us at <a href="mailto:hello@jan.ai">hello@jan.ai</a>.
        </p>
      </article>
    </div>
  );
};
export default Page;
