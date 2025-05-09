/* eslint-disable prettier/prettier */
export class AddToCartDto {
    productID: string;
    quantity: number;
    optionIDs: string[]; // Danh sách ID của các tùy chọn được chọn
  }