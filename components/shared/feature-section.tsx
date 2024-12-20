'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureSection = () => {
  const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: true });
  const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: true });

  const animationVariants = {
    hidden: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-slate-200 dark:bg-dark-1 z-50 w-full p-4">
      <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid">
        <div className="flex md:contents flex-row-reverse">
          <motion.div
            className="relative px-4 py-2 my-6 shadow-lg bg-white dark:bg-dark-2 rounded-xl col-start-1 col-end-5 mr-auto w-full md:w-2/3 md:mr-0 md:ml-auto"
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={animationVariants}
            custom="left"
          >
            <Image src="/fea-task.png" alt="logo" width={100} height={100} className="object-contain" />
            <h3 className="text-lg font-semibold lg:text-xl">Intuitive Task Boards</h3>
            <p className="mt-2 leading-6">Organize projects with easy-to-use, customizable boards.</p>
          </motion.div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300" />
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2" />
          </div>
        </div>

        <div className="flex md:contents">
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300" />
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2" />
          </div>
          <motion.div
            className="relative p-4 my-6 bg-white dark:bg-dark-2 rounded-xl col-start-6 col-end-10 mr-auto"
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            variants={animationVariants}
            custom="right"
          >
            <Image src="/team.png" alt="logo" width={100} height={100} className="object-contain" />
            <h3 className="text-lg font-semibold lg:text-xl">Real-Time Collaboration</h3>
            <p className="mt-2 leading-6">Work with your team instantly.</p>
          </motion.div>
        </div>

        <div className="flex md:contents flex-row-reverse">
          <motion.div
            className="relative px-4 py-2 my-6 bg-white dark:bg-dark-2 rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto"
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={animationVariants}
            custom="left"
          >
            <Image src="/drop.png" alt="logo" width={100} height={100} className="object-contain" />
            <h3 className="text-lg font-semibold lg:text-xl">Drag-and-Drop</h3>
            <p className="mt-2 leading-6">Move tasks effortlessly between lists.</p>
          </motion.div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300" />
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2" />
          </div>
        </div>

        <div className="flex md:contents">
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300" />
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2" />
          </div>
          <motion.div
            className="relative p-4 my-6 bg-white dark:bg-dark-2 rounded-xl col-start-6 col-end-10 mr-auto"
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            variants={animationVariants}
            custom="right"
          >
            <Image src="/label.png" alt="logo" width={100} height={100} className="object-contain" />
            <h3 className="text-lg font-semibold lg:text-xl">Custom Labels</h3>
            <p className="mt-2 leading-6">Add colorful labels to prioritize tasks.</p>
          </motion.div>
        </div>


        <div className="flex md:contents flex-row-reverse">
          <motion.div
            className="relative px-4 py-2 my-6 shadow-lg bg-white dark:bg-dark-2 rounded-xl col-start-1 col-end-5 mr-auto w-full md:w-2/3 md:mr-0 md:ml-auto"
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={animationVariants}
            custom="left"
          >
            <Image src="/bot.png" alt="logo" width={100} height={100} className="object-contain" />
            <h3 className="text-lg font-semibold lg:text-xl">FireGrid AI Bot</h3>
            <p className="mt-2 leading-6">Get help from our AI bot. If you&apos;re stuck, we&apos;re here to help.</p>
          </motion.div>
          <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
            <div className="flex items-center justify-center w-6 h-full">
              <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300" />
            </div>
            <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
