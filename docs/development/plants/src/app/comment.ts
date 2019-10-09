export class Comment {
  id: number = 0;
  username: string;
  content: string;
  hidden: boolean = false;
  added: Date;
  plant: number = 0;
  plantName?: string;
  catName?: string;
}
