import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from 'modules/app.module';

class App {
  public app: NestExpressApplication;
  public port: string | number;
  public env: string;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.init();
  }

  private async init() {
    this.app = await NestFactory.create(AppModule);

    this.config();

    this.initApiDocs();

    // this.initializeMiddleware();

    // this.filterException();

    this.listen();
  }

  private config() {
    this.app.enableCors();
    this.app.use(helmet());
    // const stopAtFirstError = process.env.STOP_AT_FIRST_VALIDATION_ERROR === 'YES';
    // this.app.useGlobalPipes(
    //   new QueryTransformPipe(),
    //   new ValidationPipe({
    //     transformOptions: {
    //       excludeExtraneousValues: true,
    //       exposeDefaultValues: true,
    //       enableImplicitConversion: true,
    //     },
    //     stopAtFirstError: stopAtFirstError,
    //     exceptionFactory: (e) => new BadRequestException({ errors: !stopAtFirstError ? e : undefined }),
    //   }),
    // );
    // this.app.use('/api/v1/sendgrid-delivery-status', raw({ type: '*/*' }));
    // this.app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
    // this.app.use(json({ limit: '1mb' }));
  }

  private initApiDocs() {
    if (process.env.API_DOC_STATUS !== 'public') {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle('API document')
      .addBearerAuth()
      .setDescription('The API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document, { swaggerOptions: { persistAuthorization: true } });
  }

  // private initializeMiddleware() {
  //   this.app.use(morganMiddleware);
  // }

  // private filterException() {
  //   const { httpAdapter } = this.app.get(HttpAdapterHost);
  //   this.app.useGlobalFilters(new ExceptionFilter(httpAdapter));
  // }

  public async listen() {
    await this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
      //logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }
}

new App();
