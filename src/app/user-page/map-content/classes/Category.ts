export class Category {
  public categoryId: number;
  public categoryName: string;


  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
  toString() {
    return 'Id = ' + this.categoryId
    + 'CategoryName = ' + this.categoryName;
  }

  }

