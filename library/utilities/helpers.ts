import { DeliveryDetails } from '../types/DeliveryDetails';

export async function generateUniqueEmail(baseEmail: string = 'test@yopmail.com') {
    return `${Date.now()}${baseEmail}`;
}

export async function getShipAddressDisplayFormat(deliveryDetails: DeliveryDetails) {
    // Juan Dela Cruz, 123 Street B456 L789, Adrian Bldg, Calamba, 4321, Philippines
    return `${deliveryDetails.firstName} ${deliveryDetails.lastName}, ${deliveryDetails.street}, ${deliveryDetails.building}, ${deliveryDetails.city}, ${deliveryDetails.postalCode}, ${deliveryDetails.country}`;
}