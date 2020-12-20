export class Bugs {
  id: string;
  title: string;
  description: string;
  priority: number;
  reporter: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  comments: [
    {
      id: string;
      reporter: string;
      description: string;
    }
  ];
}
