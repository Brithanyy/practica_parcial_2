import { TestBed } from '@angular/core/testing';

import { GestionPersonajesService } from './gestion-personajes.service';

describe('GestionPersonajesService', () => {
  let service: GestionPersonajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPersonajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
