import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  User,
  Phone,
  FileText,
  BookOpen,
  CreditCard,
  Users,
  Home,
} from "lucide-react";
import { SkincareFormData } from "@/types/global";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

interface CardWrapperProps {
  children: React.ReactNode;
  gradient: string;
  icon: React.ReactNode;
  title: string;
}

const CardWrapper = ({ children, gradient, icon, title }: CardWrapperProps) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="transform-gpu"
  >
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl p-0">
      <CardHeader className={`${gradient} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r opacity-50"
          animate={{
            x: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <CardTitle className="flex items-center gap-2 relative z-10">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <span className="text-lg">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <AnimatePresence>{children}</AnimatePresence>
      </CardContent>
    </Card>
  </motion.div>
);

// @ts-ignore
const getBadgeColor = (type) => {
  const colors = {
    DRY: "bg-yellow-100 text-yellow-800",
    OILY: "bg-green-100 text-green-800",
    COMBINATION: "bg-blue-100 text-blue-800",
    SENSITIVE: "bg-red-100 text-red-800",
    NORMAL: "bg-purple-100 text-purple-800",
  };
  // @ts-ignore
  return colors[type] || "bg-gray-100 text-gray-800";
};

const SkincareSummary = ({ data }: { data: SkincareFormData }) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-6 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CardWrapper
        gradient="from-purple-50 to-pink-50"
        icon={<User className="h-5 w-5 text-purple-500" />}
        title="Basic Skin Profile"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={cardVariants}
        >
          <motion.div className="space-y-3" variants={cardVariants}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm text-gray-500">Skin Type</span>
              <motion.div
                className={`inline-block px-3 py-1 rounded-full mt-1 ${getBadgeColor(
                  data.appointmentType
                )}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.appointmentType}
              </motion.div>
            </motion.div>
            <div>
              <span className="text-sm text-gray-500">Skin Goals</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <span
                  className={`px-3 py-1 rounded-full ${getBadgeColor(
                    data.residentType
                  )}`}
                >
                  {data.residentType}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </CardWrapper>

      {/* Document Information Section */}
      {[
        "RESIDENT_BOOK",
        "PASSPORT",
        "AMAYESH_CARD",
        "FAMILIY_PASSPORT",
      ].includes(data.residentType as string) && (
        <CardWrapper
          gradient="from-blue-50 to-indigo-50"
          icon={
            data.residentType === "RESIDENT_BOOK" ? (
              <BookOpen className="h-5 w-5 text-blue-500" />
            ) : data.residentType === "PASSPORT" ? (
              <FileText className="h-5 w-5 text-blue-500" />
            ) : data.residentType === "AMAYESH_CARD" ? (
              <CreditCard className="h-5 w-5 text-blue-500" />
            ) : (
              <Users className="h-5 w-5 text-blue-500" />
            )
          }
          title="Personal Information"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={cardVariants}
          >
            <motion.div className="space-y-3" variants={cardVariants}>
              {data.firstName && (
                <div>
                  <span className="text-sm text-gray-500">First Name</span>
                  <p className="font-medium">{data.firstName}</p>
                </div>
              )}
              {data.lastName && (
                <div>
                  <span className="text-sm text-gray-500">Last Name</span>
                  <p className="font-medium">{data.lastName}</p>
                </div>
              )}
              {data.fatherName && (
                <div>
                  <span className="text-sm text-gray-500">Father's Name</span>
                  <p className="font-medium">{data.fatherName}</p>
                </div>
              )}
            </motion.div>
            <motion.div className="space-y-3" variants={cardVariants}>
              {data.phoneNumber && (
                <div>
                  <span className="text-sm text-gray-500">Phone Number</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span>{data.phoneNumber}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </CardWrapper>
      )}
      {/* EXIT_ENTRY_DOCUMENT Section */}
      {data.appointmentType === "EXIT_ENTRY_DOCUMENT" && (
        <>
          {/* Personal Information Section */}
          <CardWrapper
            gradient="from-blue-50 to-indigo-50"
            icon={<User className="h-5 w-5 text-blue-500" />}
            title="Personal Information"
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={cardVariants}
            >
              <motion.div className="space-y-3" variants={cardVariants}>
                <div className="font-medium text-gray-700 mb-2">Persian</div>
                {data.firstName && (
                  <div>
                    <span className="text-sm text-gray-500">First Name</span>
                    <p className="font-medium">{data.firstName}</p>
                  </div>
                )}
                {data.lastName && (
                  <div>
                    <span className="text-sm text-gray-500">Last Name</span>
                    <p className="font-medium">{data.lastName}</p>
                  </div>
                )}
                {data.fatherName && (
                  <div>
                    <span className="text-sm text-gray-500">Father's Name</span>
                    <p className="font-medium">{data.fatherName}</p>
                  </div>
                )}
                {data.grandFatherName && (
                  <div>
                    <span className="text-sm text-gray-500">Grandfather's Name</span>
                    <p className="font-medium">{data.grandFatherName}</p>
                  </div>
                )}
              </motion.div>
              <motion.div className="space-y-3" variants={cardVariants}>
                <div className="font-medium text-gray-700 mb-2">Latin</div>
                {data.firstNameLatin && (
                  <div>
                    <span className="text-sm text-gray-500">First Name (Latin)</span>
                    <p className="font-medium">{data.firstNameLatin}</p>
                  </div>
                )}
                {data.lastNameLatin && (
                  <div>
                    <span className="text-sm text-gray-500">Last Name (Latin)</span>
                    <p className="font-medium">{data.lastNameLatin}</p>
                  </div>
                )}
                {data.fatherNameLatin && (
                  <div>
                    <span className="text-sm text-gray-500">Father's Name (Latin)</span>
                    <p className="font-medium">{data.fatherNameLatin}</p>
                  </div>
                )}
                {data.grandFatherNameLatin && (
                  <div>
                    <span className="text-sm text-gray-500">Grandfather's Name (Latin)</span>
                    <p className="font-medium">{data.grandFatherNameLatin}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </CardWrapper>

          {/* Document Information Section */}
          <CardWrapper
            gradient="from-purple-50 to-pink-50"
            icon={<FileText className="h-5 w-5 text-purple-500" />}
            title="Document Information"
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={cardVariants}
            >
              <motion.div className="space-y-3" variants={cardVariants}>
                {data.documentNumber && (
                  <div>
                    <span className="text-sm text-gray-500">Document Number</span>
                    <p className="font-medium">{data.documentNumber}</p>
                  </div>
                )}
                {data.birthDate && (
                  <div>
                    <span className="text-sm text-gray-500">Birth Date</span>
                    <p className="font-medium">{data.birthDate.toLocaleDateString()}</p>
                  </div>
                )}
              </motion.div>
              <motion.div className="space-y-3" variants={cardVariants}>
                {data.phoneNumber && (
                  <div>
                    <span className="text-sm text-gray-500">Phone Number</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span>{data.phoneNumber}</span>
                    </div>
                  </div>
                )}
                {data.gender && (
                  <div>
                    <span className="text-sm text-gray-500">Gender</span>
                    <p className="font-medium">{data.gender}</p>
                  </div>
                )}
                {data.maritalStatus && (
                  <div>
                    <span className="text-sm text-gray-500">Marital Status</span>
                    <p className="font-medium">{data.maritalStatus}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </CardWrapper>

          {/* Address Information Section */}
          {(data.mainProvince || data.mainDistrict || data.mainVillage) && (
            <CardWrapper
              gradient="from-green-50 to-teal-50"
              icon={<Home className="h-5 w-5 text-green-500" />}
              title="Address Information"
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={cardVariants}
              >
                {data.mainProvince && (
                  <motion.div className="space-y-3" variants={cardVariants}>
                    <div>
                      <span className="text-sm text-gray-500">Province</span>
                      <p className="font-medium">{data.mainProvince}</p>
                    </div>
                  </motion.div>
                )}
                {data.mainDistrict && (
                  <motion.div className="space-y-3" variants={cardVariants}>
                    <div>
                      <span className="text-sm text-gray-500">District</span>
                      <p className="font-medium">{data.mainDistrict}</p>
                    </div>
                  </motion.div>
                )}
                {data.mainVillage && (
                  <motion.div className="space-y-3" variants={cardVariants}>
                    <div>
                      <span className="text-sm text-gray-500">Village</span>
                      <p className="font-medium">{data.mainVillage}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </CardWrapper>
          )}

          {/* Relative Information Section */}
          {(data.relativeType || data.relativeIdCardType || data.relativeIdCardNumber || data.relativePhoneNumber) && (
            <CardWrapper
              gradient="from-amber-50 to-yellow-50"
              icon={<Users className="h-5 w-5 text-amber-500" />}
              title="Relative Information"
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={cardVariants}
              >
                <motion.div className="space-y-3" variants={cardVariants}>
                  {data.relativeType && (
                    <div>
                      <span className="text-sm text-gray-500">Relative Type</span>
                      <p className="font-medium">{data.relativeType}</p>
                    </div>
                  )}
                  {data.relativeIdCardType && (
                    <div>
                      <span className="text-sm text-gray-500">ID Card Type</span>
                      <p className="font-medium">{data.relativeIdCardType}</p>
                    </div>
                  )}
                </motion.div>
                <motion.div className="space-y-3" variants={cardVariants}>
                  {data.relativeIdCardNumber && (
                    <div>
                      <span className="text-sm text-gray-500">ID Card Number</span>
                      <p className="font-medium">{data.relativeIdCardNumber}</p>
                    </div>
                  )}
                  {data.relativePhoneNumber && (
                    <div>
                      <span className="text-sm text-gray-500">Phone Number</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-amber-500" />
                        <span>{data.relativePhoneNumber}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </CardWrapper>
          )}

          {/* Educational Information Section */}
          {(data.universityType || data.majorName || data.degree || data.universityName || 
            data.universityEntryYear || data.studentId || data.semester) && (
            <CardWrapper
              gradient="from-indigo-50 to-blue-50"
              icon={<BookOpen className="h-5 w-5 text-indigo-500" />}
              title="Educational Information"
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={cardVariants}
              >
                <motion.div className="space-y-3" variants={cardVariants}>
                  {data.universityType && (
                    <div>
                      <span className="text-sm text-gray-500">University Type</span>
                      <p className="font-medium">{data.universityType}</p>
                    </div>
                  )}
                  {data.majorName && (
                    <div>
                      <span className="text-sm text-gray-500">Major</span>
                      <p className="font-medium">{data.majorName}</p>
                    </div>
                  )}
                  {data.degree && (
                    <div>
                      <span className="text-sm text-gray-500">Degree</span>
                      <p className="font-medium">{data.degree}</p>
                    </div>
                  )}
                  {data.universityName && (
                    <div>
                      <span className="text-sm text-gray-500">University Name</span>
                      <p className="font-medium">{data.universityName}</p>
                    </div>
                  )}
                </motion.div>
                <motion.div className="space-y-3" variants={cardVariants}>
                  {data.universityEntryYear && (
                    <div>
                      <span className="text-sm text-gray-500">Entry Year</span>
                      <p className="font-medium">{data.universityEntryYear}</p>
                    </div>
                  )}
                  {data.studentId && (
                    <div>
                      <span className="text-sm text-gray-500">Student ID</span>
                      <p className="font-medium">{data.studentId}</p>
                    </div>
                  )}
                  {data.semester && (
                    <div>
                      <span className="text-sm text-gray-500">Semester</span>
                      <p className="font-medium">{data.semester}</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </CardWrapper>
          )}
        </>
      )}


      {/* Relative Information Section for non-EXIT_ENTRY_DOCUMENT */}
      {data.appointmentType !== "EXIT_ENTRY_DOCUMENT" && (data.relativeType || data.relativeIdType || data.relativeIdNumber || data.relativePhoneNumber) && (
        <CardWrapper
          gradient="from-amber-50 to-yellow-50"
          icon={<Users className="h-5 w-5 text-amber-500" />}
          title="Relative Information"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={cardVariants}
          >
            <motion.div className="space-y-3" variants={cardVariants}>
              {data.relativeType && (
                <div>
                  <span className="text-sm text-gray-500">Relative Type</span>
                  <p className="font-medium">{data.relativeType}</p>
                </div>
              )}
              {data.relativeIdType && (
                <div>
                  <span className="text-sm text-gray-500">ID Type</span>
                  <p className="font-medium">{data.relativeIdType}</p>
                </div>
              )}
            </motion.div>
            <motion.div className="space-y-3" variants={cardVariants}>
              {data.relativeIdNumber && (
                <div>
                  <span className="text-sm text-gray-500">ID Number</span>
                  <p className="font-medium">{data.relativeIdNumber}</p>
                </div>
              )}
              {data.relativePhoneNumber && (
                <div>
                  <span className="text-sm text-gray-500">Phone Number</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-amber-500" />
                    <span>{data.relativePhoneNumber}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </CardWrapper>
      )}

      </motion.div>
        
  );
};


export default SkincareSummary;
