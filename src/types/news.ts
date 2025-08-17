export interface News {
  id: number;
  title: string;
  content: string;
  img: string;
  date: string; // можно заменить на Date, если будешь парсить дату
}