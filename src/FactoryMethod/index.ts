interface Product {
  operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class ConcreteProduct1 implements Product {
  operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
  /**
   * Note that the Creator may also provide some default implementation
   * of the factory method.
   */
  public abstract factoryMethod(): Product;

  /**
   * Also note that, despite its name, the Creator's primary responsibility
   * is not creating products. Usually, it contains some core business logic
   * that relies on Product objects, returned by the factory method. Subclasses
   * can directly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Product object.
    const product = this.factoryMethod();
    // Now, use the product
    return `Creator: The same creator's code has just worked with ${product.operation()}.`;
  }
}



class ConcreteCreator1 extends Creator {
  /**
   * Note that the signature of the method still uses the abstract product type,
   * even though the concrete product is actually returned from the method. This
   * way the Creator can stay independent of concrete product classes.
   */
  factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 * @param creator
 * @constructor
 */
function clientCode(creator: Creator) {
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
  const product = creator.factoryMethod();
  console.log(product.operation());
}

console.log('App: Launched with ConcreteCreator1');
clientCode(new ConcreteCreator1());
console.log();

console.log('App: Launched with ConcreteCreator2');
clientCode(new ConcreteCreator2());
console.log();
