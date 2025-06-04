import { Injectable } from '@nestjs/common';
import { OhipRepository } from './ohip.repository';
import { OhipCodeDto } from "./dto/ohip-code.dto";

@Injectable()
export class OhipService {
  constructor(private readonly ohipRepository: OhipRepository) {}
  
  async findByCode(code: string): Promise<OhipCodeDto| null> {
    return this.ohipRepository.findByCode(code);
  }

  async getAllCodes(): Promise<OhipCodeDto[]> {
    return this.ohipRepository.findAll();
  }
}