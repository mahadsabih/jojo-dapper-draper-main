import { motion } from "framer-motion";

const AnnouncementBar = () => {
  return (
    <div className="bg-announcement text-announcement-foreground py-2.5 overflow-hidden relative flex items-center h-[40px]">
      <motion.div
        className="flex whitespace-nowrap absolute"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
        <p className="text-sm font-light tracking-wide px-8">
          • Comfort with quality • 
        </p>
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
