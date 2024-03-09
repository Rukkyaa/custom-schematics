# Custom NestJS Schematics

This project is a fork of [NestJS Schematics](https://github.com/nestjs/schematics), the schematic collection for the [NestJS](http://nestjs.com/) framework. This fork includes additional custom schematics aimed at extending the functionality to better fit our specific development needs.

## Additional Schematics

In this fork, we have added two custom schematics:

- `custom-resource`: This schematic generates a new resource with extended configurations and options tailored to our project's architecture and best practices.
- `s3-custom`: This schematic provides templates for integrating Amazon S3 services more seamlessly into our NestJS applications, including customized service modules and controllers.

## Installation

To use these custom schematics, you need to install this package instead of the standard `@nestjs/schematics`. You can install it using npm:

```bash
$ npm i -g @axel-lbrt/schematics
```

## Usage

After installing the package, you can use the custom schematics in the same way as the standard NestJS schematics. But you have to specify the collection name as `@axel-lbrt/schematics` when running the schematic commands.

For example, to generate a new resource using the `custom-resource` schematic, you can run the following command:

```bash
$ nest g @axel-lbrt/schematics:custom-resource <resource-name>
```
