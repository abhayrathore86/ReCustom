import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { ActivityLog } from 'src/model/activity.model';

@Injectable()
export class PdfService {
  generateUserPdf(user: any, activities: ActivityLog[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.on('error', (err) => reject(err));

      doc.fontSize(18).text(`User Report: ${user.name}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Name: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Role: ${user.role}`);
      doc.text(`Total Logins: ${user.activityCounts.loginCount}`);
      doc.text(`Total PDF Downloads: ${user.activityCounts.downloadCount}`);
      doc.moveDown();

      doc.text('Activity Logs:');
      activities.forEach((activity, index) => {
        doc.text(`${index + 1}. ${activity.timestamp} - ${activity.activity}`);
      });

      doc.end();
    });
  }
}
