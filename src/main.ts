import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionFilter } from 'core/filters/exception.filter';
import { logger, morganMiddleware } from 'core/logger/index.logger';
import { json } from 'express';
import { AppModule } from 'modules/app.module';

// class QueryTransformPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//     if (metadata.type === 'query') {
//       return plainToInstance(metadata.metatype, value, { excludeExtraneousValues: true });
//     }

//     return value;
//   }
// }

class App {
  public app: NestExpressApplication;
  public port: string | number;
  public env: string;

  constructor() {
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV || 'development';

    this.init();
  }

  private async init() {
    this.app = await NestFactory.create(AppModule);

    this.configApp();

    this.initAPIDocs();

    this.pipeValidation();

    this.initializeMiddleware();

    this.filterException();

    this.listen();
  }

  private configApp() {
    this.app.enableCors();
    this.app.use(json({ limit: '1mb' }));
  }

  private initAPIDocs() {
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
    SwaggerModule.setup('api-docs', this.app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  private pipeValidation() {
    const stopAtFirstError = process.env.STOP_AT_FIRST_VALIDATION_ERROR === 'YES';
    this.app.useGlobalPipes(
      //new QueryTransformPipe(),
      new ValidationPipe({
        transformOptions: {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
          enableImplicitConversion: true,
        },
        stopAtFirstError: stopAtFirstError,
        exceptionFactory: (e) => {
          console.log('ex---', e);

          return new BadRequestException({ errors: !stopAtFirstError ? e : undefined });
        },
      }),
    );
  }

  private initializeMiddleware() {
    this.app.use(morganMiddleware);
  }

  private filterException() {
    const { httpAdapter } = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new ExceptionFilter(httpAdapter));
  }

  public async listen() {
    await this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }
}

new App();
