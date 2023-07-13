const Modal = ({
  showModel,
  data,
  setShowModel,
  handleDelete,
  deleteModelContent,
  setDeletePost,
}) => {
  //   const deleteHandler = () => {
  //     setDeletePost(true);
  //     handleDelete(deleteModelContent);
  //   };
  if (showModel)
    return (
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
        <div className="md:flex items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            {/* <i className="bx bx-error text-3xl" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-3xl"
            >
              <path d="M11.001 10H13.001V15H11.001zM11 16H13V18H11z" />
              <path d="M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z" />
            </svg>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">Delete this Prompt</p>
            <p className="text-sm text-gray-700 mt-1">{data}</p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            // onClick={deleteHandler}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            Delete Post
          </button>
          <button
            // onClick={() => setShowModel(false)}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
      md:mt-0 md:order-1"
          >
            Cancel
          </button>
        </div>
      </div>
    );
};

export default Modal;
