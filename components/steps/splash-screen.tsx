"use client";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/lib/store";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CalendarRange,
  ArrowLeft,
  Rocket,
  Verified,
  Coins,
} from "lucide-react";
import { useState, useRef } from "react";

function SplashScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const setCurrentStep = useFormStore((state) => state.setCurrentStep);

  const benefits = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "نوبت دهی آسان و سریع",
      text: "دریافت نوبت بدون نیاز به مراجعه حضوری و در کمترین زمان",
    },
    {
      icon: <Verified className="w-6 h-6" />,
      title: "بررسی نوبت قبل از مراجعه",
      text: "امکان مشاهده و تایید نوبت توسط سفارت قبل از حضور در محل",
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "صرفه جویی در زمان و هزینه",
      text: "کاهش زمان انتظار و هزینه‌های اضافی با سیستم نوبت دهی آنلاین",
    },
  ];

  const handleStart = () => {
    setCurrentStep(2);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // const FloatingElements = () => {
  //   return (
  //     <div className="fixed inset-0 w-full h-full">
  //       {[...Array(12)].map((_, i) => (
  //         <motion.div
  //           key={i}
  //           style={{
  //             position: "absolute",
  //             left: `${Math.random() * 100}%`,
  //             top: `${Math.random() * 100}%`,
  //           }}
  //           initial={{
  //             y: "100vh",
  //             scale: Math.random() * 0.5 + 0.5,
  //             rotate: Math.random() * 360,
  //           }}
  //           animate={{
  //             y: "-100vh",
  //             rotate: Math.random() * 360,
  //             transition: {
  //               duration: Math.random() * 8 + 5,
  //               repeat: Infinity,
  //               ease: "linear",
  //               delay: Math.random() * 2,
  //             },
  //           }}
  //         >
  //           {i % 2 === 0 ? (
  //             <Stars className="w-4 h-4 text-pink-300/30" />
  //           ) : (
  //             <Sparkles className="w-3 h-3 text-purple-300/30" />
  //           )}
  //         </motion.div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-sidebar">
      {/* <FloatingElements /> */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-3xl mx-auto text-center"
        >
          <div className="text-center space-y-4">
            <motion.div variants={itemVariants} className="flex justify-center">
              <CalendarRange className="w-12 h-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text mb-4" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-5xl bg-gradient-to-r text-center from-primary to-primary/60 bg-clip-text text-transparent">
                سیستم نوبت دهی هوشمند سفارت افغانستان
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-base text-center md:text-xl text-gray-600">
                لطفا در تمامی مراحل دقت کافی را داشته باشید و از ورود اطلاعات
                اشتباه خودداری کنید.
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              className="bg-primary text-primary-foreground px-8 py-6 text-lg rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              onClick={handleStart}
            >
              <span className="flex items-center gap-2">
                شروع گرفتن نوبت
                <ArrowLeft />
              </span>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              لطفا مدارک خود را آماده کنید.
            </p>
          </motion.div>

          {/* Mobile Carousel */}
          <motion.div variants={itemVariants} className="relative md:hidden">
            <div className="overflow-hidden" ref={carouselRef}>
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {benefits.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                      <div className="flex flex-col items-center text-center gap-3">
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text bg-pink-100 p-3 rounded-full">
                          {item.icon}
                        </span>
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-pink-100 text-pink-500"
                aria-label="Previous slide"
              >
                <ChevronRight className="w-4 h-4" />

              </button>
              <div className="flex gap-2">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? "bg-primary" : "bg-pink-200"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-pink-100 text-pink-500"
                aria-label="Next slide"
              >
                <ChevronLeft className="w-4 h-4" />

              </button>
            </div>
          </motion.div>

          {/* Desktop Grid */}
          <motion.div
            variants={itemVariants}
            className="hidden md:grid grid-cols-3 gap-6"
          >
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="text-primary bg-accent p-3 rounded-full">
                    {item.icon}
                  </span>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SplashScreen;
