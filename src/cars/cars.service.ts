import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private _cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Mustang',
    },
  ];

  getAll(): Car[] {
    if (!this._cars.length) throw new NotFoundException('No cars available');

    return this._cars;
  }

  getById(id: string): Car {
    const car = this._cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(carDto: CreateCarDto): CreateCarDto {
    if (!carDto) throw new NotFoundException('Car data is required');

    const repeatCar = this._cars.find((car) => car.model === carDto.model);
    if (repeatCar) throw new BadRequestException('Car already exists');

    const car: Car = {
      id: uuid(),
      ...carDto,
    };
    this._cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): UpdateCarDto {
    let carDB = this.getById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not allowed to be updated');

    this._cars = this._cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this._cars = this._cars.filter((car) => car.id !== id);
  }
}
