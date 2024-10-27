import { Test, TestingModule } from '@nestjs/testing';
import { NombreRestResolver } from './nombre-rest.resolver';

describe('NombreRestResolver', () => {
  let resolver: NombreRestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NombreRestResolver],
    }).compile();

    resolver = module.get<NombreRestResolver>(NombreRestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
