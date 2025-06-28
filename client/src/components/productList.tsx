import { iProduct } from '../types/iProduct';

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
