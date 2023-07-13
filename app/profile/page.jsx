"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { toast } from "react-toastify";
// import Modal from "@/components/Modal";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    return redirect("/");
  }

  const [myPosts, setMyPosts] = useState([]);

  //   const [deletePost, setDeletePost] = useState(false);
  //   const [showModel, setShowModel] = useState(false);
  //   const [deleteModelContent, setDeleteModelContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      //   console.log("from delete api", post);
      //   setShowModel(false);
      try {
        let response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        response = await response.json();

        if (!response?.success) {
          return toast.error(response.message);
        }

        toast.success(response.message);

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* {showModel ? (
        <Modal
          showModel={showModel}
          setShowModel={setShowModel}
          data={deleteModelContent.prompt}
          deleteModelContent={deleteModelContent}
          handleDelete={handleDelete}
          setDeletePost={setDeletePost}
          //   data={myPosts.filter((post) => {
          //     return post.creator === session?.user.id;
          //   })}
        />
      ) : ( */}
      <Profile
        // setDeleteModelContent={setDeleteModelContent}
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        // setShowModel={setShowModel}
      />
      {/* )} */}
    </>
  );
};

export default MyProfile;
