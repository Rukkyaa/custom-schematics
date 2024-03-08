import { Injectable } from '@nestjs/common';<% if (crud) { %>
import { PrismaService } from 'nestjs-prisma';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { DeleteMany<%= classify(name) %>Dto } from './dto/delete-many-<%= name %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } else if (crud) { %>
import { Create<%= singular(classify(name)) %>Input } from './dto/create-<%= singular(name) %>.input';
import { Update<%= singular(classify(name)) %>Input } from './dto/update-<%= singular(name) %>.input';<% } %>

@Injectable()
export class <%= classify(name) %>Service {<% if (crud) { %>
  constructor(private readonly prismaService: PrismaService) {}

  async create(create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    const <%= lowercased(classify(name)) %> = await this.prismaService.<%= lowercased(classify(name)) %>.create({
      data: {
        ...create<%= singular(classify(name)) %>Dto,
      },
    });
    return <%= lowercased(classify(name)) %>;
  }

  async findAll() {
    return this.prismaService.<%= lowercased(classify(name)) %>.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.<%= lowercased(classify(name)) %>.findUnique({
      where: { id },
    });
  }

  async update(id: number, update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    const <%= lowercased(classify(name)) %> = await this.prismaService.<%= lowercased(classify(name)) %>.update({
      where: { id },
      data: {
        ...update<%= singular(classify(name)) %>Dto,
      },
    });
    return <%= lowercased(classify(name)) %>;
  }

  async remove(id: number) {
    return this.prismaService.<%= lowercased(classify(name)) %>.delete({
      where: { id },
    });
  }

  async bulk(deleteMany<%= classify(name) %>Dto: DeleteMany<%= classify(name) %>Dto) {
    return this.prismaService.<%= lowercased(classify(name)) %>.deleteMany({
      where: {
        id: {
          in: deleteMany<%= classify(name) %>Dto.ids,
        },
      },
    });
  }
<% } %>}
