export class CartItem {
  name: string;
  type: string;
  uid: string;
  size: number;

  constructor(name: string, type: string, uid: string, size: number) {
    this.name = name;
    this.type = type;
    this.uid = uid;
    this.size = size;
  }

}
