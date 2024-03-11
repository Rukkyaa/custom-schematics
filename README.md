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

## Setup

To use the custom-schematics, you have to put a `nest-cli.json` file in the root of your project with the following content:

```json
{
  "collection": "@axel-lbrt/schematics",
  "sourceRoot": "apps/backend/src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

# Usage

You can now use the custom schematics in the same way as the standard NestJS schematics. For example, to generate a new resource, you can run:

```bash
$ nest g res-custom api/users --no-spec
```
