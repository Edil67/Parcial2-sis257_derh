import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Serie } from './entities/serie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie) private seriesRepository: Repository<Serie>,
  ) {}
  //crear
  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    const existe = await this.seriesRepository.findOneBy({
      titulo: createSerieDto.titulo.trim(),
      director: createSerieDto.director.trim(),
      id_pais: createSerieDto.id_pais,
      idiomaPrincipal: createSerieDto.idiomaPrincipal.trim(),
    });

    if (existe) throw new ConflictException('La serie ya existe');

    const serie = new Serie();
    serie.titulo = createSerieDto.titulo.trim();
    serie.id_pais = createSerieDto.id_pais;
    serie.sinopsis = createSerieDto.sinopsis.trim();
    serie.director = createSerieDto.director.trim();
    serie.idiomaPrincipal = createSerieDto.idiomaPrincipal.trim();
    serie.temporadas = createSerieDto.temporadas;
    serie.fecha_estreno = createSerieDto.fecha_estreno;
    return this.seriesRepository.save(serie);
  }

  async findAll(): Promise<Serie[]> {
    return this.seriesRepository.find({
      relations: { pais: true },
      select: {
        id: true,
        titulo: true,
        sinopsis: true,
        director: true,
        idiomaPrincipal: true,
        temporadas: true,
        fecha_estreno: true,
      },
    });
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.seriesRepository.findOne({
      where: { id },
      relations: { pais: true },
    });
    if (!serie) throw new NotFoundException('Serie no encontrada');
    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto): Promise<Serie> {
    const serie = await this.findOne(id);
    Object.assign(serie, updateSerieDto);
    return this.seriesRepository.save(serie);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    await this.seriesRepository.softRemove(serie);
  }
}
