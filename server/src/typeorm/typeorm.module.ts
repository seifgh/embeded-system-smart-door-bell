import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormMySqlConfigService } from './typeormMysql.service';

export default TypeOrmModule.forRootAsync({
  useClass: TypeormMySqlConfigService,
  inject: [TypeormMySqlConfigService],
});
