export interface Article {
    id: string;
    title: string;
    link: string;
    description: string;
}

export const articles: Article[] = [
    {
        id: "1",
        title: "Top 10 Job Search Tips",
        link: "https://www.linkedin.com/in/anant-chandra/",
        description: "Discover the most effective strategies to land your dream job."
    },
    {
        id: "2",
        title: "How to Ace Your Interview",
        link: "/interview-tips",
        description: "Learn proven techniques to impress your interviewer and stand out from other candidates."
    },
    {
        id: "3",
        title: "Resume Writing Guide",
        link: "/resume-guide",
        description: "Create a compelling resume that gets you noticed by employers."
    },
    {
        id: "4",
        title: "Networking Strategies",
        link: "/networking",
        description: "Build and leverage your professional network to advance your career."
    },
    {
        id: "5",
        title: "Negotiating Your Salary",
        link: "/salary-negotiation",
        description: "Master the art of salary negotiation to ensure you're paid what you're worth."
    }
];