import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export class TwoFactorService {
  static async getSecretBase64Image() {
    const secret = speakeasy.generateSecret({ name: 'YourAppName' });
    console.log(secret);

    if (!secret.otpauth_url) {
      throw new Error('Failed to generate otpauth_url');
    }

    try {
      const image = await qrcode.toDataURL(secret.otpauth_url);
      return { image, secret };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to generate QR code');
    }
  }

  static postUserToken(userToken: string, secret: speakeasy.GeneratedSecret) {
    console.log(userToken, secret);
    const verified = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token: userToken,
    });

    if (verified) {
      console.log('驗證成功');
      return { verified: true, message: '驗證成功' };
    } else {
      console.log('驗證失敗');
      return { verified: false, message: '驗證失敗' };
    }
  }
}
