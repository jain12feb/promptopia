import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex justify-start items-start flex-col lg:flex-row">
      <div className="lg:mt-16">
        <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {type} Post
          </span>
        </h1>
        <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-base text-gray-500 outline-0"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="w-full flex rounded-lg mt-2 p-3 text-base text-gray-500 outline-0"
          />
        </label>

        <div className="flex justify-end items-center mx-3 mb-5 gap-4">
          <Link href="/" className="text-black font-semibold text-sm px-2">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm font-semibold bg-primary-orange rounded-full text-white"
          >
            {submitting ? (type === "Create" ? "Creating" : "Updating") : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
