//Routes:
//Landing:/
//Login:/login
//Register:/register
//Dashboard:/dashboard/:name
//PublicProfiles:/public-profile/:name

export const PageRoutes = {
  Landing: "/",
  Home: "/home",
  Login: "/login",
  Register: "/register",
  Dashboard: "/dashboard/",
  PublicProfile: "/public-profile/",
  PublicProfiles: "/public-profiles/",
  AboutUs: "/about-us",
  ContactUs: "/contact-us",
  Explore: "/explore",
  UploadMaterial: "/upload-material",
  EditMaterial: "/edit-material/",
  StudyMaterial: "/study-material/",
};
export const validFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.ms-powerpoint",
];
export const validFileTypesString = validFileTypes.join(", ");
export const Times = {
  Second: 1000,
  Minute: 60 * 1000,
  Hour: 60 * 60 * 1000,
  Day: 24 * 60 * 60 * 1000,
};
export const Standards = [
  {
    group: "School",
    items: [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
    ],
  },
  {
    group: "College",
    items: ["UG", "PG", "Higher Studies"],
  },
];
export const Fields = {
  Science: [
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Computer Science",
  ],
  Arts: [
    "English",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Psychology",
  ],
  Commerce: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Business Mathematics",
    "Statistics",
  ],
};
export const FieldsColor = {
  Science: "green",
  Commerce: "red",
  Arts: "blue",
};
export const FieldsStatic = [
  {
    group: "Science",
    items: [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics",
      "Computer Science",
    ],
  },
  {
    group: "Commerce",
    items: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Business Mathematics",
      "Statistics",
    ],
  },
  {
    group: "Arts",
    items: [
      "English",
      "History",
      "Geography",
      "Political Science",
      "Economics",
      "Psychology",
    ],
  },
];
export const Genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unknown", label: "Don't wanna share" },
];
export const leaderboardCategories = {
  Senior: "senior",
  Junior: "junior",
  Material: "material",
};
