export interface PostFrontMatter {
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  description: string;
  image?: string;
  draft: boolean;
  author?: string;
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
  htmlContent: string;
  readingTime: number;
  excerpt: string;
}
