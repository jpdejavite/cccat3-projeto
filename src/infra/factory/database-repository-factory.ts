import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import CouponRepository from '../../domain/repository/coupon-repository';
import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import DatabaseConnection from '../database/database-connection';
import CouponRepositoryDatabase from '../repository/database/coupon-repository-database';
import ItemRepositoryDatabase from '../repository/database/item-repository-database';
import OrderRepositoryDatabase from '../repository/database/order-repository-database';

export default class DatabaseRepositoryFactory implements AbstractRepositoryFactory {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.databaseConnection);
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.databaseConnection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.databaseConnection);
  }
}
