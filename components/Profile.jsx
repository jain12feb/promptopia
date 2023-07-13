import Link from "next/link";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  // setDeleteModelContent,
  // setShowModel,
}) => {
  return (
    <section className="w-full">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {name} Profile
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left">
        {desc}
      </p>

      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data.map((post) => (
          // setDeleteModelContent && setDeleteModelContent(post),
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            // setShowModel={setShowModel}
          />
        ))}
      </div>
      {data.length <= 0 && (
        <div className="flex justify-center items-center">
          <div className="inline-flex py-2.5 px-5 text-4xl text-gray-600 text-center flex-col border rounded-md">
            You Don't Have Ant Prompt
            <Link
              className="my-3 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent cursor-pointer"
              href="/create-prompt"
            >
              Create Your First Prompt
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
