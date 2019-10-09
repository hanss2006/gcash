export class Plant {
  id: number = 0;
  name: string;
  short: string;
  lng: string;
  price: number = 0;
  featured: boolean = false;
  cat: number = 0;
  mainPic?: string;
  mainPic2?: File;
  additionalPics?: any[];
  additionalPics2?: File[];
}
