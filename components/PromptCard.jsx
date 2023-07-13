"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
  // setShowModel,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard
      .writeText(post.prompt)
      .then(() => {
        toast.info("Text Copied Successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div
          className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div>
        {post.tag.split(" ").map((tag, i) => {
          return (
            <span
              key={i}
              onClick={() => handleTagClick && handleTagClick(tag)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white cursor-pointer mx-1 inline-block rounded py-1 px-2 text-sm font-semibol"
            >
              {tag}
            </span>
          );
        })}
      </div>
      {/* {post.tag.split(" ").map((tag, i) => {
        return (
          <>
          
            <p
              key={i}
              className="inline font-inter text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              {tag}
            </p>{" "}
          </>
        );
      })} */}

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter font-semibold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter font-semibold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
