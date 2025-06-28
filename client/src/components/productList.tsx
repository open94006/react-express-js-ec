import { iProduct } from '../types/product';

export const ProductView = ({ id, name, salePrice, children }: iProduct) => {
  return (
    <>
      <h2 onClick={() => console.log(children)}>{name}</h2>
      <div>
        {id}, ${salePrice}
      </div>
    </>
  );
};
