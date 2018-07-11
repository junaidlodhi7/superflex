import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSessionDetailsComponent } from './storage-session-details.component';

describe('StorageSessionDetailsComponent', () => {
  let component: StorageSessionDetailsComponent;
  let fixture: ComponentFixture<StorageSessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageSessionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
