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
        link: "https://www.erekrut.com/",
        description: "Discover the most effective strategies to land your dream job."
    }
];