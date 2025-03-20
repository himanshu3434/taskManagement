export interface Iuser {
  id: number;
  name: string;
  email: string;
}
export interface Itask {
  id: number;
  heading: string;
  description: string;
  status: ["PENDING" | "COMPLETED"];
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
