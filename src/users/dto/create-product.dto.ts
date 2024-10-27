import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: '10054512' })
  identificacion: string;

  @IsString()
  @ApiProperty({ example: 'mango' })
  descripcion: string;

  @IsNumber()
  @ApiProperty({ example: 5000 })
  valor: number;

  @IsNumber()
  @ApiProperty({ example: 10 })
  disponibles: number;

  @IsString()
  @ApiProperty({ example: 'client_id_example' }) 
  clientId: string;
}
