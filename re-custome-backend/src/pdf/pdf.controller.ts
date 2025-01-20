import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { UsersService } from 'src/users/users.service';
import { ActivityService } from 'src/activity/activity.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly userService: UsersService,
    private readonly activityService: ActivityService,
    private readonly pdfService: PdfService,
  ) {}

  @Get(':id')
  async generatePdf(@Param('id') id: number, @Res() res: Response) {
    try {
      // Fetch user and activity data
      const user = await this.userService.getUserById(id);
      const activity = await this.activityService.findByUserId(id);

      if (!user) {
        return res.status(404).send('User not found');
      }

      const pdfBuffer = await this.pdfService.generateUserPdf(
        user.data,
        activity,
      );
      await this.activityService.create(user.data.id, 'Download PDF');

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="user_${user.data.id}_report.pdf"`,
      );
      res.send(pdfBuffer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
    }
  }
}
