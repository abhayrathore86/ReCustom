import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(private sequelize: Sequelize) {}

  async grantPermissions() {
    const query1 = `
      GRANT USAGE ON SCHEMA public TO recustom;
    `;
    const query2 = `
      GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO recustom;
    `;
    const query3 = `
      GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO recustom;
    `;
    const query4 = `
      GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO recustom;
    `;
    const query5 = `
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO recustom;
    `;
    const query6 = `
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO recustom;
    `;
    const query7 = `
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO recustom;
    `;

    // Execute all queries
    await this.sequelize.query(query1);
    await this.sequelize.query(query2);
    await this.sequelize.query(query3);
    await this.sequelize.query(query4);
    await this.sequelize.query(query5);
    await this.sequelize.query(query6);
    await this.sequelize.query(query7);

    console.log('Permissions granted successfully.');
  }
}
