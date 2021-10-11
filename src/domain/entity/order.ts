import EmptyItems from '../errors/empty-items.error';
import ExpiredCoupon from '../errors/expired-coupon.error';
import InvalidCpf from '../errors/invalid-cpf.error';
import CpfValidator from '../validators/cpf.validator';

import Coupon from './coupon';
import Item from './item';
import OrderItem from './order-item';

const MINIMUM_SHIPPING_COST = 10;

const UNIQUE_SEQUENTIAL_ID_MAX_SIZE = 8;

class Order {
  private readonly clientCpf: string;
  private readonly orderItems: OrderItem[];
  private coupon?: Coupon;
  private orderCode: string;

  constructor(clientCpf: string, readonly issueDate: Date = new Date()) {
    if (!CpfValidator.validate(clientCpf)) {
      throw new InvalidCpf();
    }
    this.clientCpf = clientCpf;
    this.orderItems = [];
    this.orderCode = '';
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


  public generateOrderCode(uniqueSequentialId: number): void {
    this.orderCode = `${this.issueDate.getFullYear()}${this.padWithZeros(uniqueSequentialId, UNIQUE_SEQUENTIAL_ID_MAX_SIZE)}`;
  }

  public getOrderCode(): string {
    return this.orderCode;
  }

  private padWithZeros(num: number, size: number): string {
    const numberdWihtLeadingZeros = `00000000000000${num}`;
    return numberdWihtLeadingZeros.substr(numberdWihtLeadingZeros.length - size);
  }

  private calculateFinalPriceWithDiscount(): number {
    const discount = this.coupon!.discountAmount;
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
