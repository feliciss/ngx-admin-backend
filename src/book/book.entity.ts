
import { Arrival } from 'src/arrival/arrival.entity';
import { Lending } from 'src/lending/lending.entity';
import { Procurement } from 'src/procurement/procurement.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

export enum StateType {
    BORROWABLE = 'B',
    DISCONTINUED = 'D',
    MAINTAINING = 'M',
}
export enum SpeciesType {
    ELECTRONIC = 'E',
    PAPER = 'P',
}

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Warehouse, warehouse => warehouse.books)
    warehouse: Warehouse;

    @Column({
        type: "varchar",
        length: 255,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 3,
        nullable: true,
    })
    type: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    author: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    press: string;

    @Column({
        type: "date",
        nullable: true,
    })
    publication: Date;

    @Column({
        type: "int",
        length: 13,
        unique: true
    })
    isbn: number;

    @Column({
        type: "int",
        length: 9,
        nullable: true,
    })
    quantity: number;

    @Column({
        type: "varchar",
        length: 2083,
        nullable: true
    })
    img: string;

    @Column({
        type: "varchar",
        length: 1024,
        nullable: true
    })
    intro: string;

    @Column({
        type: "timestamp",
        nullable: true
    })
    date: Date;

    @Column({
        type: "enum",
        enum: StateType,
        nullable: true,
    })
    state: StateType;

    @Column({
        type: "varchar",
        length: 2,
        nullable: true
    })
    language: string;

    @Column({
        type: "money",
        nullable: true
    })
    price: number;

    @Column({
        type: "enum",
        enum: SpeciesType,
        nullable: true,
    })
    species: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true
    })
    geography: string;

    @Column({
        type: "date",
        nullable: true
    })
    warehousedate: Date;

    @Column({
        type: "int",
        length: 9,
        nullable: true
    })
    warehousequantity: number;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
    })
    memo: string;

    @OneToMany(type => Procurement, procurement => procurement.book)
    public procurement!: Procurement[];

    @OneToMany(type => Lending, lending => lending.book)
    public lending!: Lending[];

    @OneToMany(type => Arrival, arrival => arrival.book)
    public arrival!: Arrival[];
}