namespace BuilderMethod {
  interface Builder {
    productPartA(): void;
    productPartB(): void;
    productPartC(): void;
  }

  interface Product {
    name: string;
    parts: string[];
    listParts: () => void;
  }

  // abstract class Product {
  //   public abstract name: string;
  //   public abstract parts: string[];
  //   public abstract listParts: () => void;
  //
  // }

  class Product1 implements Product {
    constructor(name: string) {
      this.name = name;
    }
    public name = '';
    public parts: string[] = [];


    public listParts(): void {
      console.log(`${this.name} parts: ${this.parts.join(', ')}\n`);
    }
  }

  class Product2 implements Product {
    constructor(name: string) {
      this.name = name;
    }

    public name = '';
    public parts: string[] = [];

    public listParts(): void {
      console.log(`${this.name} parts: ${this.parts.join(', ')}\n`);
    }

    public partsCount(): number {
      return this.parts.length;
    }
  }

  class ConcreteBuilder1 implements Builder {
    private product!: Product1;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.product = new Product1('product1');
    }

    public productPartA(): void {
      this.product.parts.push('PartA1');
    }

    public productPartB(): void {
      this.product.parts.push('PartB1');
    }

    public productPartC(): void {
      this.product.parts.push('PartC1');
    }

    public getProduct(): Product1 {
      const result = this.product;
      this.reset();
      return result;
    }
  }

  class ConcreteBuilder2 implements Builder {
    private product!: Product2;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.product = new Product2('product2');
    }

    public productPartA(): void {
      this.product.parts.push('PartA2');
    }

    public productPartB(): void {
      this.product.parts.push('PartB2');
    }

    public productPartC(): void {
      this.product.parts.push('PartC2');
    }

    public productPartD(): void {
      this.product.parts.push('PartD2');
    }

    public getProduct(): Product2 {
      const result = this.product;
      return result;
    }
  }

  class Director {
    private builder!: Builder;

    public setBuilder(builder: Builder): void {
      this.builder = builder;
    }

    public buildMinimalViableProduct(): void {
      this.builder.productPartA();
    }

    public buildFullFeatureProduct(): void {
      this.builder.productPartA();
      this.builder.productPartB();
      this.builder.productPartC();
    }
  }

  function clientCode(director: Director): void {
    const builder1 = new ConcreteBuilder1();
    director.setBuilder(builder1);

    console.log('------ Build with builder 1 ------');
    console.log('Standard basic product: ');
    director.buildMinimalViableProduct();
    builder1.getProduct().listParts();

    console.log('Standard full feature product: ');
    director.buildFullFeatureProduct();
    builder1.getProduct().listParts();

    console.log('Custom product: ');
    builder1.productPartA();
    builder1.productPartC();
    builder1.getProduct().listParts();

    const builder2 = new ConcreteBuilder2();
    director.setBuilder(builder2);

    console.log('------ Build with builder 2 ------');
    console.log('Standard basic product: ');
    director.buildMinimalViableProduct();
    builder2.getProduct().listParts();
    builder2.reset();

    console.log('Standard full feature product: ');
    director.buildFullFeatureProduct();
    builder2.getProduct().listParts();
    builder2.reset();

    console.log('Custom product: ');
    builder2.productPartA();
    builder2.productPartC();
    builder2.productPartD();
    builder2.getProduct().listParts();
    console.log(`The number of parts of product2 is : ${builder2.getProduct().partsCount()}`)
    builder2.reset();
  }

  clientCode(new Director());
}

