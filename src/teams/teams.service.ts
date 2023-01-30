import { Injectable } from '@nestjs/common';
import { PrismaService } from './../common/services/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTeamDto: CreateTeamDto) {
    return await this.prisma.team.create({
      data: { ...createTeamDto },
    });
  }

  async findAll() {
    return this.prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            middleName: true,
            score: true,
            role: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.team.findUnique({
      where: { id: Number(id) },
      include: {
        members: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            middleName: true,
            score: true,
            role: true,
          },
        },
      },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id: Number(id) },
      data: { ...updateTeamDto },
      include: {
        members: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            middleName: true,
            score: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.prisma.team.delete({
      where: { id: Number(id) },
    });
  }
}
