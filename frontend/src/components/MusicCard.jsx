import ReactPlayer from "react-player";

export default function MusicStudioCard({ url, title, description }) {
  return (
    <div
    style={{ backgroundColor: "#ffffff10" }}
      className="flex flex-col items-center justify-center w-[300px] md:w-[350px] md:h-[320px] p-4 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <ReactPlayer
        url={url}
        height="100%"
        width="100%"
      />
      <div className="flex flex-col flex-start mt-4 text-white">
        <h1 className="font-black text-2xl">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
