// Interfaces
interface IProduct {
   id: number;
   name: string;
   price: number;
  }
  
  interface ICustomer {
   id: number;
   name: string;
   email: string;
  }
  
  interface IOrder {
   id: number;
   customer: ICustomer;
   products: IProduct[];
   total: number;
  }
  
  // Services
  class ProductService {
   private products: IProduct[] = [];
  
   constructor() {
      this.products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 },
      ];
   }
  
   getProducts(): IProduct[] {
      return this.products;
   }
  
   getProduct(id: number): IProduct | undefined {
     return this.products.find((product) => product.id === id);
   }
   
  }
  
  class CustomerService {
   private customers: ICustomer[] = [];
  
   constructor() {
      this.customers = [
        { id: 1, name: 'Customer 1', email: 'customer1@example.com' },
        { id: 2, name: 'Customer 2', email: 'customer2@example.com' },
        { id: 3, name: 'Customer 3', email: 'customer3@example.com' },
      ];
   }
  
   getCustomers(): ICustomer[] {
      return this.customers;
   }
  
   getCustomer(id: number): ICustomer | undefined {
     return this.customers.find((customer) => customer.id === id);
   }
   
  }
  
  class OrderService {
   private orders: IOrder[] = [];
  
   constructor(private productService: ProductService, private customerService: CustomerService) {}
  
   createOrder(customerId: number, productIds: number[]): IOrder {
      const customer = this.customerService.getCustomer(customerId);
      const products = productIds.map((productId) => this.productService.getProduct(productId));
      const total = products.reduce((acc, product) => (product ? acc + product.price : acc), 0);
  
      const order: IOrder = {
        id: this.orders.length + 1,
        customer: customer as ICustomer,
        products: products as IProduct[],
        total,
      };
  
      this.orders.push(order);
      return order;
   }
  
   getOrders(): IOrder[] {
      return this.orders;
   }
  }
  
  // Usage
  const productService = new ProductService();
  const customerService = new CustomerService();
  const orderService = new OrderService(productService, customerService);
  
  const order = orderService.createOrder(1, [1, 2]);
  console.log(order);
  


