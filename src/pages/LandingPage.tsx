import { motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import WelcomeShare from "../images/WelcomeShare";
import WelcomeUpload from "../images/WelcomeUpload";
import { useInternalRouter } from "./routing";

const bgVideo = require("../images/space.mp4");
function LandingPage() {
  const { width, height } = useWindowSize();
  const { push } = useInternalRouter();
  const handleClickGoToMain = () => {
    push("/auth");
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <motion.div className="bg-white w-full flex items-center justify-center h-[90vh] overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            height: [120, 120, 120, height, height],
            width: [120, 120, 120, width, width],
            y: [-50, 0, -50, 0, 0],
            borderRadius: ["100%", "100%", "40%", "0%", "0%"],
            transitionEnd: {
              display: "none",
            },
          }}
          transition={{
            duration: 6,
            delay: 0.5,
            ease: [0, 0.8, 0.2, 0.4],
            transitionEnd: {
              display: "none",
            },
          }}
          className="w-full h-full bg-teal-700 z-30"
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1, 1, 1, 0],
            y: [200, 0],
          }}
          transition={{
            duration: 1,
            delay: 3,
            ease: [0.075, 0.82, 0.165, 1],
          }}
          className="font-bold text-5xl xl:text-9xl absolute text-white z-40"
        >
          Welcome
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1, 1, 1, 0],
            y: [200, 0],
          }}
          transition={{
            duration: 1,
            delay: 4,
            ease: [0.075, 0.82, 0.165, 1],
          }}
          className="font-bold text-5xl xl:text-9xl absolute text-white z-40"
        >
          to
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1, 1, 1, 0],
            y: [200, 0],
          }}
          transition={{
            duration: 1,
            delay: 5,
            ease: [0.075, 0.82, 0.165, 1],
          }}
          className="text-5xl xl:text-9xl absolute text-purple-500 font-extrabold  drop-shadow-lg z-40"
        >
          VCMemories!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: -100,
          }}
          transition={{
            duration: 1,
            delay: 6,
            ease: "backIn",
          }}
          className="text-5xl xl:text-9xl absolute text-purple-500 font-extrabold z-50 drop-shadow-lg"
        >
          VCMemories
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: width >= 1280 ? 50 : 0,
          }}
          transition={{
            duration: 1,
            delay: 6,
            ease: "backIn",
          }}
          className="text-2xl xl:text-4xl absolute text-white font-extrabold z-50 drop-shadow-lg"
        >
          Post all you're fun memories
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: width >= 1280 ? 170 : 120,
          }}
          transition={{
            duration: 1,
            delay: 6,
            ease: "backIn",
          }}
          className="absolute bg-purple-500 text-white p-3 rounded-lg text-lg xl:text-2xl z-50"
          onClick={handleClickGoToMain}
        >
          Go to main
        </motion.button>
        <motion.video
          autoPlay
          muted
          loop
          width="100%"
          height="100%"
          className="opacity-40 z-40 absolute object-fill w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.4,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 6,
            ease: "backIn",
            transitionEnd: {
              delay: 0,
            },
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </motion.video>
      </motion.div>
      <div className="bg-white w-full h-[90vh]">
        {/* <h3 className="text-center mt-5 text-4xl font-bold">Title</h3> */}
        <div className="flex flex-col items-center justify-evenly w-full h-full xl:flex-row">
          <div className="flex flex-col items-center justify-center w-[300px] xl:w-[450px]">
            <WelcomeUpload className="w-40 h-40 xl:w-52 xl:h-52" />
            <p className="font-bold text-3xl mt-3 text-center">
              Upload your images/videos of unforgettable moments
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-[300px] xl:w-[450px]">
            <WelcomeShare className="w-40 h-40 xl:w-52 xl:h-52" />
            <p className="font-bold text-3xl mt-3 text-center">
              Share with your friends
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LandingPage;
