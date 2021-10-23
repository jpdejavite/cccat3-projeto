import ExpiredCoupon from '../errors/expired-coupon.error';
import InvalidCpf from '../errors/invalid-cpf.error';

import Coupon from './coupon';
import Cpf from './cpf';
import Item from './item';
import OrderItem from './order-item';

const MINIMUM_SHIPPING_COST = 10;

const UNIQUE_SEQUENTIAL_ID_MAX_SIZE = 8;

class Order {
  private readonly clientCpf: Cpf;
  private readonly orderItems: OrderItem[];
  private coupon?: Coupon;
  private code: string;

  constructor(clientCpf: string, readonly issueDate: Date = new Date()) {
    this.clientCpf = new Cpf(clientCpf);
    this.orderItems = [];
    this.code = '';
  }

  public addItem(item: Item, quantity: number): void {
    this.orderItems.push(new OrderItem(item, quantity));
  }

  public getShippingCost(): number {
    const shippingCost = this.orderItems.reduce((sum, item) => {
      return sum + item.getShippingCost();
    }, 0);

    return shippingCost < MINIMUM_SHIPPING_COST ? MINIMUM_SHIPPING_COST : shippingCost;
  }

  public addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.issueDate)) {
      throw new ExpiredCoupon();
    }
    this.coupon = coupon;
  }

  public getTotal(): number {
    if (this.coupon) {
      return this.calculateFinalPriceWithDiscount();
    }
    return this.orderItems.reduce((sum, item) => sum + item.getFinalPrice(), 0);
  }


  public generateCode(uniqueSequentialId: number): void {
    this.code = `${this.issueDate.getFullYear()}${this.padWithZeros(uniqueSequentialId, UNIQUE_SEQUENTIAL_ID_MAX_SIZE)}`;
  }

  public getCode(): string {
    return this.code;
  }

  public getClientCpf(): string {
    return this.clientCpf.getValue();
  }

  public getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  private padWithZeros(num: number, size: number): string {
    const numberdWihtLeadingZeros = `00000000000000${num}`;
    return numberdWihtLeadingZeros.substr(numberdWihtLeadingZeros.length - size);
  }

  private calculateFinalPriceWithDiscount(): number {
    const discount = this.coupon!.discountPercentage;
    return this.orderItems.reduce((sum, item) => {
      item.applyDiscount(discount);
      return sum + item.getFinalPrice();
    }, 0);
  }

}

export {
  Order,
  MINIMUM_SHIPPING_COST,
};
