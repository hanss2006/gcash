export class PlantBase {
  page: number = 1;
  search: string = '';
  
  getPageParams(n: number): any {
    const params = {};
    if (n > 1) {
      params['page'] = n;
    }
    if (this.search) {
      params['search'] = this.search;
    }
    return params;
  }
}
