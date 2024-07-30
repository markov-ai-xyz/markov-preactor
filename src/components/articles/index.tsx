export interface Article {
    id: string;
    title: string;
    link: string;
    description: string;
}

export const articles: Article[] = [
    {
        id: "1",
        title: "Terms & Conditions",
        link: "https://www.erekrut.com/terms-conditions/",
        description: "Please read these carefully before proceeding."
    }
];