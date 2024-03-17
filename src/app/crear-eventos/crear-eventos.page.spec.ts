import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearEventosPage } from './crear-eventos.page';

describe('CrearEventosPage', () => {
  let component: CrearEventosPage;
  let fixture: ComponentFixture<CrearEventosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
