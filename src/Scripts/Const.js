//Routes:
//Landing:/
//Login:/login
//Register:/register
//Dashboard:/dashboard/:name
//PublicProfiles:/public-profile/:name

export const PageRoutes = {
    Landing: "/",
    Login: "/login",
    Register: "/register",
    Dashboard: "/dashboard/",
    PublicProfile: "/public-profile/",
    PublicProfiles: "/public-profiles/",
    AboutUs: "/about-us",
    ContactUs: "/contact-us",
    Explore: "/explore",
    UploadMaterial: "/upload-material",
    StudyMaterial: "/study-material/",
};
export const Times = {
    Second: 1000,
    Minute: 60 * 1000,
    Hour: 60 * 60 * 1000,
    Day: 24 * 60 * 60 * 1000,
};
export const Standards = [
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
    "UG",
    "PG",
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
}