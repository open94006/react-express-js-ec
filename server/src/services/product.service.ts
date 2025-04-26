export class ProductService {
  static getProdcut() {
    return {
      message: 'Get prodcut service!',
    };
  }

  static postProdcut(data: any) {
    console.log(data);
    return {
      message: 'Post prodcut service!',
    };
  }
}
