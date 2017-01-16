import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai  from 'sinon-chai';

const expect = chai.expect;
chai.use(sinonChai);

import { observe } from './observe';

describe('Observe', () => {
  it('Should thrown an error if no store is available on the component', () => {

    class SelectTest {
      @observe()
      public myProperty

      constructor() {}
    }

    const selectTest = new SelectTest();

    function shouldThrow() {
      selectTest.myProperty;
    }

    expect(shouldThrow).to.throw('Observe decorator can only be used if the store is injected');
  });

  it('Should call observe method on the store with the given selector', () => {

    class SelectTest {
      @observe('foobar')
      public myProperty;

      constructor(private store: any) {
        this.store = store;
      }
    }

    const observeSpy = sinon.spy();
    const store = {
      observe: observeSpy
    };

    const selectTest = new SelectTest(store);
    const observable = selectTest.myProperty;
    expect(observeSpy).to.be.calledWith('foobar');
  });


  it('Should call observe method on the store with the property name converted to path if no selector given', () => {

    class SelectTest {
      @observe()
      public myProperty;

      constructor(private store: any) {}
    }

    const observeSpy = sinon.spy();
    const store = {
      observe: observeSpy
    };

    const selectTest = new SelectTest(store);
    const observable = selectTest.myProperty;
    expect(observeSpy).to.be.calledWith('my.property');
  });
});