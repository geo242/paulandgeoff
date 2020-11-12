import { Pipe, PipeTransform } from '@angular/core';
import * as Case from 'case';

export type CaseType = 'title' | 'sentence' | 'upper' | 'lower' | 'capital' | 'header'

@Pipe({
  name: 'case'
})
export class CasePipe implements PipeTransform {
  private readonly allowedTypes = ['title', 'sentence', 'upper', 'lower', 'capital', 'header']
  public transform(text: string, type: CaseType = 'title'): any {
    if (this.allowedTypes.indexOf(type) < 0) {
      console.warn(`Case type of "${type}" is not allowed`);
      return text;
    }
    return Case[type](text);
  }
}
