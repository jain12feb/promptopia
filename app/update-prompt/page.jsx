"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
import { toast } from "react-toastify";

const UpdatePrompt = ({ params, searchParams }) => {
  console.log(searchParams);
  const router = useRouter();
  const { id: promptId } = searchParams;

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      let data = await response.json();
      //   console.log("prompt", data);

      if (!data.success) {
        toast.error(data.message);
        return router.push("/");
      }

      data = data.prompt;

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return toast.error("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
