type iProduct = {
  id: number;
  name: string;
  salePrice: number;
};

export class ProductService {
  static getProdcut() {
    return {
      message: 'Get prodcut service!',
    };
  }

  static getProdcutList() {
    const productList: iProduct[] = [
      { id: 1, name: '牛奶', salePrice: 130 },
      { id: 2, name: '白豆漿', salePrice: 50 },
      { id: 3, name: '黑豆漿', salePrice: 70 },
      { id: 4, name: '汽水', salePrice: 40 },
    ];

    return {
      data: productList,
      total: productList.length,
      page: 1,
      pageSize: 10,
      message: 'Get prodcut service!',
    };
  }

  static postProdcut(data: any) {
    return {
      message: 'Post prodcut service!',
    };
  }
}
