import { join, Path, strings } from '@angular-devkit/core';
import { classify } from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Source,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import * as pluralize from 'pluralize';
import { DeclarationOptions, ModuleDeclarator, ModuleFinder } from '../..';
import {
  addDependencies,
  NodeDependencyType,
} from '../../utils/dependencies.utils';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { S3Options } from './s3-custom.schema';

export function main(options: S3Options): Rule {
  options = transform(options);

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        addDependencies([
          {
            name: '@aws-sdk/client-s3',
            version: '^3.337.0',
            type: NodeDependencyType.Default,
          },
          {
            name: '@aws-sdk/s3-request-presigner',
            version: '^3.337.0',
            type: NodeDependencyType.Default,
          },
          {
            name: 'uuid',
            version: '^9.0.0',
            type: NodeDependencyType.Default,
          },
        ]),
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(options: S3Options): S3Options {
  const target: S3Options = Object.assign({}, options);
  target.metadata = 'imports';

  const location: Location = new NameParser().parse(target);
  target.name = normalizeToKebabOrSnakeCase(location.name);
  target.path = normalizeToKebabOrSnakeCase(location.path);
  target.language = 'ts';

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);

  return target;
}

function generate(options: S3Options): Source {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path, options.language)), [
      template({
        ...strings,
        ...options,
        lowercased: (name: string) => {
          const classifiedName = classify(name);
          return (
            classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1)
          );
        },
        singular: (name: string) => pluralize.singular(name),
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: S3Options): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, {
        ...options,
        type: 'module',
      } as DeclarationOptions),
    );
    return tree;
  };
}
