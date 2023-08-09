import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col text-black justify-center items-center my-14">
      <article className="prose lg:prose-xl">
        <h1>Support </h1>
        <h3>Get fast support in our Discord channel</h3>
        <Link
          className="flex gap-2 cursor-pointer"
          href={process.env.NEXT_PUBLIC_DISCORD_INVITATION_URL || ""}
          target="_blank_"
        >
          <Image src={"/icons/discord.svg"} width={70} height={70} alt="" />
        </Link>
        <p>
          If you have any questions or concerns about our privacy policy or support services, please
          contact us at <a href="mailto:hello@jan.ai">hello@jan.ai</a>.
        </p>
      </article>
    </div>
  );
};
export default Page;
