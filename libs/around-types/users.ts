import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @ApiProperty({
    type: String,
  })
  _id: string;

  @IsEmail()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  password: string;

  @ApiProperty({
    type: String,
  })
  firstName?: string;

  @ApiProperty({
    type: String,
  })
  lastName?: string;
}
