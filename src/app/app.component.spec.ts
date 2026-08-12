import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the 'porfolio' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('porfolio');
  });

  // The generated "should render title" spec asserted on 'Hello, porfolio',
  // markup this app has never had, so it failed on every run. Rendering the
  // full tree here would also need HttpClient + TranslateService providers,
  // which belongs in a component-level spec rather than this smoke test.
});
