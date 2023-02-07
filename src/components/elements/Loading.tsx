const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center space-x-2">
      <div
        className="spinner-grow inline-block h-8 w-8 rounded-full bg-current text-blue-600 opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
  spinner-grow inline-block h-8 w-8 rounded-full bg-current text-purple-500
    opacity-0
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
  spinner-grow inline-block h-8 w-8 rounded-full bg-current text-green-500
    opacity-0
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block h-8 w-8 rounded-full bg-current text-red-500 opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
  spinner-grow inline-block h-8 w-8 rounded-full bg-current text-yellow-500
    opacity-0
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block h-8 w-8 rounded-full bg-current text-blue-300 opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block h-8 w-8 rounded-full bg-current text-gray-300 opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
