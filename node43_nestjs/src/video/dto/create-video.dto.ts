import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto { }


export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    hinhAnh: any;
}

export class FilesUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    hinhAnh: any[];
}
