export class AccountTree {
  guid = '';
  name: string;
  accountType: string;
  commodityGuid: string;
  commodityScu: number;
  nonStdScu: number;
  parentGuid: string;
  code: string;
  description: string;
  hidden: number;
  placeholder: number;
  children?: AccountTree[];
}
