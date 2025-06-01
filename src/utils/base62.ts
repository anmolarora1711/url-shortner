export class Base62 {
  private readonly charset: string =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  public encode(num: number): string {
    if (num < 0) return '';
    if (num === 0) return this.charset[0];

    let result = '';
    while (num > 0) {
      result = this.charset[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }
}
