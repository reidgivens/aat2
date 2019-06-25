import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilterFormService {

  private filterForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(new FormGroup({filters: new FormArray([])}));
  filterForm$: Observable<FormGroup> = this.filterForm.asObservable();

  constructor() { }

  addFilter(formGroup: FormGroup){
    const currentFilterForm = this.filterForm.getValue();
    const currentFilters = currentFilterForm.get('filters') as FormArray;

    currentFilters.push(formGroup);
    this.filterForm.next(currentFilterForm);
  }

  deleteFilter(i: number){
    const currentFilterForm = this.filterForm.getValue();
    const currentFilters = currentFilterForm.get('filters') as FormArray;

    currentFilters.removeAt(i);
    this.filterForm.next(currentFilterForm);
  }

  // formArrays can only have numeric keys, so to find one by name, we have to search for it
  deleteFilterByHasKey(key: string){
    const currentFilterForm = this.filterForm.getValue();
    const currentFilters = currentFilterForm.get('filters') as FormArray;

    let cflen = currentFilters.controls.length;
    for(let i = 0; i < cflen; i++){
      let thisFilter = currentFilters.at(+1);
      if(thisFilter['controls'].hasOwnProperty(key)){
        this.deleteFilter(i);
      }
    }
  }

  clearFilters(){
    const currentFilterForm = this.filterForm.getValue();
    const currentFilters = currentFilterForm.get('filters') as FormArray;
    // angular 8 has a clear() method e.g. - currentFilters.clear()
    while(currentFilters.controls.length !== 0){
      currentFilters.removeAt(0);
    }
    this.filterForm.next(currentFilterForm);
  }
}
