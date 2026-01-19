import { test, expect } from '@playwright/test';
import { HomePage } from '../library/pages/Home';
import { AccountPanel } from '../library/components/AccountPanel';
import { MyAccountPage } from '../library/pages/MyAccount';
import { ProductDetailPage } from '../library/pages/ProductDetail';
import { ProductsPage } from '../library/pages/Products';
import { CartPage } from '../library/pages/Cart';
import { AddressPage } from '../library/pages/checkout/Address';
import { DeliveryPage } from '../library/pages/checkout/Delivery';
import { PaymentPage } from '../library/pages/checkout/Payment';
import { ConfirmationPage } from '../library/pages/checkout/Confirmation';
import { Header } from '../library/components/Header';
import { expectFlashMessage } from '../library/utilities/assertions';
import { generateUniqueEmail, getShipAddressDisplayFormat } from '../library/utilities/helpers';
import { DeliveryDetails } from '../library/types/DeliveryDetails';
import { ProductOrder } from '../library/types/ProductOrder';
import { CardDetails } from '../library/types/CardDetails';
import { AccountDetails } from '../library/types/AccountDetails';

test('Newly created account can checkout successfully', async({page}) => {
    // test data
    const email = await generateUniqueEmail();
    const accountData: AccountDetails = {
        email,
        password: "password"
    }

    const productOrderData: ProductOrder = {
        "id": "product-263",
        "name": "Blue Polo Shirt",
        "size": "L",
        "color": "Blue",
        "quantity": 1,
        "displayPrice": "$34.99 $24.99",
        "regularPrice": "$34.99",
        "salePrice": "$24.99",
        "cost": "$24.99"
    }

    const deliveryData: DeliveryDetails = {
        "country": "Philippines",
        "street": "123 Street B456 L789",
        "building": "Adrian Bldg",
        "city": "Calamba",
        "postalCode": "4321",
        "phone": "5555555",
        "firstName": "Juan",
        "lastName": "Dela Cruz",
        "method": "Premium"
    }

    const cardData: CardDetails = {
        "No": "4242 4242 4242 4242",
        "expDate": "11/30",
        "cvv": "1234"
    }

    const deliveryMethods = [
        { 
            "name": "Standard",
            "description": "Delivery in 3-5 business days",
            "price": "$5.00"
        },
        { 
            "name": "Premium",
            "description": "Delivery in 2-3 business days",
            "price": "$10.00"
        },
        { 
            "name": "Next Day",
            "description": "Delivery in 1-2 business days",
            "price": "$15.00"
        }
    ]

    // 1. go to site
    const home = new HomePage(page);
    await home.open();
    await expect(page).toHaveURL(/spreecommerce/);
    
    // 2. sign up
    const header = new Header(page);
    await header.openAccountPanel();
    await expect(page).toHaveURL(/spreecommerce/);

    const accountPanel = new AccountPanel(page);
    await accountPanel.signUp(accountData); 
    await expectFlashMessage(page, 'Welcome! You have signed up successfully.');

    // sign out
    await header.openAccountPanel();
    await expect(page).toHaveURL('/account/orders');

    const myAccount = new MyAccountPage(page);
    await myAccount.logOut();
    await expectFlashMessage(page, 'Signed out successfully.');
    
    // 3. log in
    await header.openAccountPanel();
    await accountPanel.logIn(accountData)
    await expectFlashMessage(page, 'Signed in successfully.');

    // 4. browse product and open a product detail page
    await header.goToProducts();
    await expect(page).toHaveURL(/products/);

    const products = new ProductsPage(page);
    await products.openProduct(productOrderData.id);
    
    // verify product details - name & price
    const product = new ProductDetailPage(page);
    await expect(product.name).toHaveText(productOrderData.name);
    expect(await product.getPriceDisplay()).toEqual(productOrderData.displayPrice)
    if (productOrderData.salePrice) {
        await expect(product.regularPrice).toContainClass('line-through');
    }

    // 5. add product to cart
    await product.addProductToCart(productOrderData)
    
    // 6. verify product details in cart - # of products, product name, color, quantity
    const cart = new CartPage(page);
    expect(await cart.getProductsCount()).toEqual(1);
    const productInCart = await cart.getProductInCartUsingName(productOrderData.name);
    await expect(productInCart).toContainText(productOrderData.name);
    await expect(productInCart).toContainText(productOrderData.size);
    await expect(productInCart).toContainText(productOrderData.color);
    expect(await productInCart.getByLabel('Quantity').inputValue()).toEqual(productOrderData.quantity.toString());
    const totalCost = await cart.totalCost.textContent();
    expect(totalCost?.trim()).toEqual(productOrderData.cost);

    // 7. proceed to checkout
    await cart.proceedToCheckout();
    const address = new AddressPage(page);
    await expect(page).toHaveURL(/\/checkout\/.*\/address/);
    
    await address.fillAddress(deliveryData);

    const delivery = new DeliveryPage(page);
    await expect(page).toHaveURL(/\/checkout\/.*\/delivery/);

    // verify different delivery and pricing options
    deliveryMethods.forEach(async (data) => {
        let method = await delivery.getDeliveryMethod(data.name);
        await expect(method).toContainText(data.name);
        await expect(method).toContainText(data.description);
        await expect(method).toContainText(data.price);
    });

    await delivery.selectDelivery(deliveryData.method);

    // verify delivery method details
    const payment = new PaymentPage(page);
    await expect(page).toHaveURL(/\/checkout\/.*\/payment/);
    await payment.fillPaymentDetails(cardData);
    
    // verify order confirmation
    const confirmation = new ConfirmationPage(page);
    await expect(page).toHaveURL(/\/checkout\/.*\/complete/);
    expect(await confirmation.getConfirmationNo()).toBeTruthy();
    await expect(confirmation.confirmationSection).toContainText(`Thanks ${deliveryData.firstName} for your order!`);
    await expect(confirmation.confirmationSection).toContainText('Your order is confirmed!');
    await expect(confirmation.confirmationSection).toContainText('When your order is ready, you will receive an email confirmation.');
})