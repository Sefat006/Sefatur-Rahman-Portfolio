import newmultitech from "../assets/projects/new-multi-tech.jpg";
import travelsbangla from "../assets/projects/travels-bangla.jpg";
import astana from "../assets/projects/astana.jpg";
import interspacebd from "../assets/projects/inter-space-bd.jpg";
import dhakastudyabroad from "../assets/projects/dhaka-study-abroad.jpg";
import codestationx from "../assets/projects/code-station-x.jpg";
import restaurent from "../assets/projects/restaurent.png";
import vapepark from "../assets/projects/vapepark.jpg";
import pacificfood from "../assets/projects/pacific-food.png";

export const isValidUrl = (url) => Boolean(url && typeof url === 'string' && url.trim() !== '' && url !== '#');

export const DESCRIPTION_LIMIT = 100;

export const projectsData = [
  {
    id: 1,
    title: "New MultiTech LTD",
    category: "E-commerce",
    image: newmultitech,
    description: "New Multitech International is a leading importer and industrial supplier in Bangladesh, specializing in high-performance FAF Vana products. We are committed to delivering precision fluid control solutions and reliable industrial equipment that ensure maximum safety and operational efficiency for every project.",
    features: [
      "Stripe payment gateway integration with secure checkout",
      "Comprehensive Admin dashboard with real-time sales analytics",
      "JWT authentication with role-based permissions (Customer/Admin)",
      "Real-time stock inventory updates and order tracking"
    ],
    stack: ["Laravel", "MySQL", "HTML", "Bootstrap CSS", "CSS"],
    liveUrl: "https://www.newmultitechint.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Featured"
  },
  {
    id: 2,
    title: "Restaurent Website",
    category: "Restaurent",
    image: restaurent,
    description: "This is a restaurent website using React.js and Firebase. I have tried to make it as beautiful as possible. I have used Tailwind CSS for styling and Firebase for authentication and database. I have also used Heroicons for icons.",
    features: [
      "Stripe payment gateway integration with secure checkout",
      "Comprehensive Admin dashboard with real-time sales analytics",
      "JWT authentication with role-based permissions (Customer/Admin)",
    ],
    stack: ["MERN Stack", "Reactjs", "Nodejs", "MongoDB", "Firebase"],
    liveUrl: "https://bistro-boss-restaurant-b3076.web.app/",
    githubUrl: "https://github.com/Sefat006/Bistro-Boss-Restaurant-Client-and-Server",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Personal Project"
  },
  {
    id: 3,
    title: "Vape Park",
    category: "E-commerce",
    image: vapepark,
    description: "Vape Park is an e-commerce website for vape products. It is a full stack website using Laravel and MySQL Database. It has a payment gateway integrated for easy and secure payments.",
    features: [
      "This is a full stack website using Laravel and MySQL Database",
      "Stripe payment gateway integration with secure checkout",
      "Comprehensive Admin dashboard with real-time sales analytics",
      "Role-based permissions (Customer/Admin)",
    ],
    stack: ["Laravel", "MySQL", "Bootstrap CSS", "CSS"],
    liveUrl: "https://vapeparkbd.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Customized"
  },
  {
    id: 4,
    title: "Pacific Food BD",
    category: "E-commerce",
    image: pacificfood,
    description: "Pacific Food BD is an e-commerce website for food products. It is a full stack website using Laravel and MySQL. It has a payment gateway integrated for easy and secure payments.",
    features: [
      "This is a full stack website using Laravel and MySQL Database",
      "EPS Payment gateway integration with secure checkout",
      "Admin dashboard with real-time sales analytics",
      "Role-based permissions (Customer/Admin)",
    ],
    stack: ["Laravel", "MySQL", "Bootstrap CSS", "CSS", "HTML"],
    liveUrl: "https://pacificfoodbd.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Customized"
  },
  {
    id: 5,
    title: "Inter Space BD",
    category: "Landing",
    image: interspacebd,
    description: "Inter Space BD is a Civil Engineering Company in Bangladesh, offering a wide range of civil engineering services including structural design, construction management, and land surveying.",
    features: [
      "this is a full stack website using raw PHP and SQLite Database"
    ],
    stack: ["PHP", "SQLite", "HTML", "Bootstrap CSS", "CSS"],
    liveUrl: "https://www.inter-bd.com/pages/index.php",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Enterprise"
  },
  {
    id: 6,
    title: "Dhaka Study Abroad",
    category: "Educational",
    image: dhakastudyabroad,
    description: "Dhaka Study Abroad is a leading educational consultancy in Bangladesh, providing comprehensive guidance and support to students aspiring to pursue higher education abroad. With a focus on academic excellence and career success, we offer personalized counseling, visa assistance, and seamless admission services to students targeting institutions in China, Canada, Australia, the USA, and Europe.",
    features: [
      "This is a full stack website using Laravel and MySQL Database",
      "Responsive Design",
      "Admin dashboard"
    ],
    stack: ["Laravel", "MySQL", "HTML", "Bootstrap CSS", "CSS"],
    liveUrl: "https://dhakastudyabroad.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Client Work"
  },
  {
    id: 7,
    title: "Code Station X",
    category: "Landing",
    image: codestationx,
    description: "Code Station X is a software agency in Bangladesh, providing comprehensive and innovative software development services to clients worldwide. With a focus on quality, reliability, and customer satisfaction, we offer a wide range of software solutions tailored to meet the specific needs of our clients.",
    features: [
      "This is a full stack website using PHP and SQLite Database",
      "Responsive Design",
      "Admin dashboard"
    ],
    stack: ["PHP", "SQLite", "HTML", "Bootstrap CSS", "CSS"],
    liveUrl: "https://codestationx.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-blue-600 via-indigo-500 to-cyan-400",
    badge: "Enterprise"
  },
  {
    id: 8,
    title: "Travels Bangla",
    category: "Tourism",
    image: travelsbangla,
    description: "Travels Bangla is an international travel company committed to delivering smooth, reliable, and memorable travel experiences worldwide. We specialize in well-planned journeys, personalized service, and trusted support—making global travel simple and stress-free.",
    features: [
      "Advanced Search & Filter System: Enables travelers to effortlessly find their ideal trip by filtering options such as destination, dates, price range, group size, and travel interests.",
      "Comprehensive Admin Dashboard: Allows administrators to efficiently manage bookings, update tour packages, monitor payments, track customer data, and generate detailed travel reports.",
      "User-Friendly Interface: Features an intuitive and responsive design that provides a seamless booking experience across all devices, including desktops, tablets, and smartphones."
    ],
    stack: ["PHP", "SQLite", "HTML", "Bootstrap CSS"],
    liveUrl: "https://travelsbangla.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    badge: "Enterprise"
  },
  {
    id: 9,
    title: "Astana Resort",
    category: "Landing",
    image: astana,
    description: "Astana Resort is a premier destination in Gazipur, Bangladesh, offering an immersive forest experience with luxurious stays, adventure activities, and exceptional hospitality. Nestled amidst natural beauty, we provide a perfect escape for nature lovers seeking relaxation and adventure.",
    features: [
      "Advanced Search & Filter: Instantly find your perfect stay with filters for accommodation type, budget, ratings, amenities, and accessibility features.",
      "Comprehensive Admin Dashboard: Manage bookings, view real-time analytics, handle room inventory, and update resort information—all from one secure admin panel.",
      "Role-Based Access Control: Secure authentication with distinct roles for customers, administrators, and support staff ensures data integrity and smooth operations.",
      "Responsive Design: Seamless booking experience across all devices, from mobile phones to desktop computers, ensuring accessibility for every guest."
    ],
    stack: ["PHP", "SQLite", "HTML", "Bootstrap CSS"],
    liveUrl: "https://astana-mtnl.com/",
    githubUrl: "",
    isOffline: false,
    gradient: "from-purple-600 via-violet-500 to-pink-500",
    badge: "Enterprise"
  }
];
