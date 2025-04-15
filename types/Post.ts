export interface Image {
url: string;
alt: string;
}

export interface Meta {
    author: string | null;
    tags: string[] | null;
    images: Image[];
  }
  
export interface Post {
    id: number;
    platform: string|null;
    title: string|null;
    status: string|null;
    headline: string|null;
    content: string|null;
    published_date: string | null; 
    link: string|null;
    meta: Meta;
  }