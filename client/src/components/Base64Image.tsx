type Base64ImageProps = {
  image: string;
};

export const Base64Image = ({ image }: Base64ImageProps) => {
  if (!image) {
    return <div>載入中...</div>;
  }
  return (
    <div>
      <img src={image} alt="2FA QR Code" />
    </div>
  );
};
