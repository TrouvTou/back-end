import { Item } from "../entities/item.entity";

export abstract class IItemRepository {
    abstract create(item: Item): Promise<Item>;
    abstract findAll(): Promise<Item[]>;
}