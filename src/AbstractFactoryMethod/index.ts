interface AbstractProductA {
  usefulFunctionA(): string;
}

interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return 'The result of the product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return 'The result of the product A2.';
  }
}

class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return 'The result of the product B1.';
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return 'The result of the product B2.';
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productA.usefulFunctionA());
  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

clientCode(new ConcreteFactory1());
clientCode(new ConcreteFactory2());
