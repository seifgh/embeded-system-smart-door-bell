import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/app/auth/services/auth.service';
import { QueryFailedError, Repository } from 'typeorm';
import { TypeOrmErrorCodes } from '../../../constants/typeorm-error-codes';
import {
  NOT_FOUND_BODY_RESPONSE,
  UNIQUE_EMAIL_BODY_RESPONSE,
} from '../../../shared/body-responses';
import { AdminEntity, AdminRole } from '../admin.entity';
import {
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
} from './admin-back-office.dto';
import { AdminData } from './admin-back-office.interface';

@Injectable()
export class AdminBackOfficeService {
  private readonly logger = new Logger(AdminBackOfficeService.name);

  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,

    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {
    this.create({
      email: 'ademhassine30@yahoo.fr',
      fullName: 'Ya 8ali',
      password: 'azerty123',
      role: AdminRole.SUPERUSER,
    })
      .then(() => {
        this.logger.verbose(
          'ADMIN CREATED SUCCSSFULY (email: ademhassine30@yahoo.fr, pass: azerty123)',
        );
      })
      .catch(() => {});
  }

  async getOne(id: number): Promise<AdminData> {
    return this.formatAdminData(await this.findOne(id));
  }

  async getMany(options: IPaginationOptions): Promise<Pagination<AdminData>> {
    const paginatedData = await paginate<AdminEntity>(
      this.adminRepository,
      options,
      {
        order: {
          updatedAt: 'DESC',
        },
      },
    );
    return new Pagination(
      paginatedData.items.map((admin) => this.formatAdminData(admin)),
      paginatedData.meta,
    );
  }

  async create(data: CreateAdminDto): Promise<AdminData> {
    try {
      const newAdmin = new AdminEntity();
      newAdmin.email = data.email;
      newAdmin.fullName = data.fullName;
      newAdmin.role = data.role;

      await newAdmin.hashPassword(data.password);
      return this.formatAdminData(await this.adminRepository.save(newAdmin));
    } catch (err) {
      this.handleUniqueEmailError(err);
    }
  }

  async update(id: number, toUpdate: UpdateAdminDto): Promise<AdminData> {
    const foundAdmin = await this.findOne(id);
    if (foundAdmin) {
      try {
        foundAdmin.email = toUpdate.email;
        foundAdmin.fullName = toUpdate.fullName;
        foundAdmin.role = toUpdate.role;
        if (toUpdate.password) {
          await foundAdmin.hashPassword(toUpdate.password);
        }
        await foundAdmin.save();
        return this.formatAdminData(foundAdmin);
      } catch (err) {
        this.handleUniqueEmailError(err);
      }
    }
  }

  async deleteOne(id: number) {
    const foundAdmin = await this.findOne(id);
    await foundAdmin.remove();
  }

  async findOne(id: number): Promise<AdminEntity> {
    const foundAdmin = await this.adminRepository.findOne(id);
    if (foundAdmin) {
      return foundAdmin;
    }
    throw new HttpException(NOT_FOUND_BODY_RESPONSE, HttpStatus.NOT_FOUND);
  }

  async login(dto: LoginAdminDto) {
    const foundAdmin = await this.adminRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (foundAdmin && (await foundAdmin.verifyPassword(dto.password))) {
      return {
        authToken: this.authService.generateAccessToken(foundAdmin.id),
        admin: this.formatAdminData(foundAdmin),
      };
    }
    throw new HttpException(
      'Invalid password or email',
      HttpStatus.UNAUTHORIZED,
    );
  }

  private formatAdminData(admin: AdminEntity): AdminData {
    return {
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  }

  private handleUniqueEmailError(err: QueryFailedError | any) {
    if (
      err instanceof QueryFailedError &&
      err.driverError.errno == TypeOrmErrorCodes.DUPLICATED_KEY
    ) {
      throw new HttpException(
        UNIQUE_EMAIL_BODY_RESPONSE,
        HttpStatus.BAD_REQUEST,
      );
    }
    throw err;
  }
}
