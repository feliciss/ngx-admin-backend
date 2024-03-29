import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>,
        @InjectRepository(Warehouse)
        private readonly warehousesRepository: Repository<Warehouse>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = new Book();
        book.warehouse = await this.warehousesRepository.findOneOrFail(createBookDto.warehouseId);
        book.name = createBookDto.name;
        book.type = createBookDto.type;
        book.author = createBookDto.author;
        book.press = createBookDto.press;
        book.publication = createBookDto.publication;
        book.isbn = createBookDto.isbn;
        book.quantity = createBookDto.quantity;
        book.img = createBookDto.img;
        book.intro = createBookDto.intro;
        book.date = createBookDto.date;
        book.state = createBookDto.state;
        book.language = createBookDto.language;
        book.price = createBookDto.price;
        book.species = createBookDto.species;
        book.geography = createBookDto.geography;
        book.warehouseDate = createBookDto.warehouseDate;
        book.warehouseQuantity = createBookDto.warehouseQuantity;
        book.memo = createBookDto.memo;

        return this.booksRepository.save(book);
    }

    async findAll(): Promise<Book[]> {
        return this.booksRepository.find();
    }

    findOne(id: number): Promise<Book> {
        return this.booksRepository.findOne(id);
    }

    async update(id: string, bookData: CreateBookDto): Promise<Book> {
        const toUpdate = await this.booksRepository.findOne(id);
        const newData = Object.assign(toUpdate, bookData);
        return this.booksRepository.save(newData);
    }

    async remove(id: string): Promise<void> {
        await this.booksRepository.delete(id);
    }
}
