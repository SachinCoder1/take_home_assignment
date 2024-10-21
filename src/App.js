import './App.css';
import Main from './components/Main';


function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <div className="bg-[#37393F] md:w-[1082px] md:h-[668px] px-4 md:pb-16 pt-4 rounded-xl">
        <h2 className='pb-4 text-xl text-white'>Cropper</h2>
        <Main videoSrc={"https://res.cloudinary.com/ddhv43zka/video/upload/v1729519568/football_match.mp4"} />
      </div>
    </div>
  );
}

export default App;
