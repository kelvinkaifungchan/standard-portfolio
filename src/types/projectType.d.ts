export interface Project {
  name: string;
  date: string;
  description: string;
  location: string;
  contentHtml: string;
  media: Media[];
}

export interface Media {
  type: string;
  link: string;
  caption: string;
}
