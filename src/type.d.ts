interface Bed {
  bedNo: string;
  showName: string;
  bedVideo: string;
  bedType: string;
  deptCode: string;
  hosCode: string;
  _links: any;
}

type Embedded<ClassKey extends string = string, T> = Record<ClassKey, T>

type Record<K extends keyof any, T> = {
  [P in K]: T[];
};

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Data<T, key> {
  _embedded: Embedded<key, T>;
  _links: any;
  page: Page;
}
