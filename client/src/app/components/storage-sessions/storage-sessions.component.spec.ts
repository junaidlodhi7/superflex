import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSessionsComponent } from './storage-sessions.component';

describe('StorageSessionsComponent', () => {
  let component: StorageSessionsComponent;
  let fixture: ComponentFixture<StorageSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
