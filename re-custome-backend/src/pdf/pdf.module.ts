import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { ActivityModule } from 'src/activity/activity.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ActivityModule, UsersModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
