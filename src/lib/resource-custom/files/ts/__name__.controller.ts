<% if (crud) { %>import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { DeleteMany<%= classify(name) %>Dto } from './dto/delete-many-<%= name %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } %>

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (crud) { %>

  @Post()
  async create(@Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto);
  }

  @Get()
  async findAll() {
    return this.<%= lowercased(name) %>Service.findAll();
  }

  @Delete()
  async bulk(@Body() deleteMany<%= classify(name) %>Dto: DeleteMany<%= classify(name) %>Dto) {
    return this.<%= lowercased(name) %>Service.bulk(deleteMany<%= classify(name) %>Dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.update(+id, update<%= singular(classify(name)) %>Dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.remove(+id);
  }<% } %>
}
