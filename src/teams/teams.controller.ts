import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/auth-user';
import { Roles } from 'src/common/Decorators/roles.decorators';
import { Role } from 'src/common/Enums/Roles';
import { Usr } from './../user/user.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles(Role.admin)
  create(@Usr() user: AuthUser, @Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles(Role.user)
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.user)
  async findOne(@Param('id') id: string) {
    const team = await this.teamService.findOne(+id);
    console.log(team);
    if (!team) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.admin)
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.user)
  async remove(@Param('id') id: string) {
    try {
      await this.teamService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Team deleted successfully',
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }
      console.log(error);
      throw error.status;
    }
  }
}
