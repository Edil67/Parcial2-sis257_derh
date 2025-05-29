import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais) private paisesRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const existe = await this.paisesRepository.findOneBy({
      descripcion: createPaisDto.descripcion.trim(),
    });
    if (existe) throw new ConflictException('El país ya existe');

    const pais = new Pais();
    pais.descripcion = createPaisDto.descripcion.trim();
    return this.paisesRepository.save(pais);
  }

  async findAll(): Promise<Pais[]> {
    return this.paisesRepository.find({
      select: {
        id: true,
        descripcion: true,
      },
    });
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisesRepository.findOne({
      where: { id },
    });
    if (!pais) throw new NotFoundException('Pais no encontrado');
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id);
    Object.assign(pais, updatePaisDto);
    return this.paisesRepository.save(pais);
  }

  async remove(id: number) {
    const pais = await this.findOne(id);
    await this.paisesRepository.softRemove(pais);
  }
}
