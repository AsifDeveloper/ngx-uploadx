/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UploadxService } from './uploadx.service';
import { UploadxDirective } from './uploadx.directive';

@Component({
  template: `
    <input type="file" [uploadx]="options" [uploadxAction]="action" />
  `
})
class UploadxTestComponent {
  options = {
    allowedTypes: 'image/*,video/*',
    endpoint: `http://localhost:3003/upload/?parts=test`
  };
  action = { action: 'pauseAll' };
}

describe('Directive: UploadxDirective', () => {
  let component: UploadxTestComponent;
  let fixture: ComponentFixture<UploadxTestComponent>;
  let inputEl: DebugElement;
  let uploadService: UploadxService;
  let uploadServiceSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadxTestComponent, UploadxDirective],
      providers: [UploadxService]
    }).compileComponents();
    fixture = TestBed.createComponent(UploadxTestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    uploadService = fixture.debugElement.injector.get<UploadxService>(UploadxService);
    uploadServiceSpy = spyOn(uploadService, 'control').and.callThrough();
  });

  it('has attribute "accept"', () => {
    fixture.detectChanges();
    expect(inputEl.nativeElement.hasAttribute('accept')).toBe(true);
  });
  it('has attribute "multiple"', () => {
    fixture.detectChanges();
    expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
  });
  it('set uploadxAction', () => {
    fixture.detectChanges();
    expect(uploadServiceSpy).toHaveBeenCalled();
  });
});
