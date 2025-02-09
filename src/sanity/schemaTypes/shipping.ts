
    
const ShippingSchema = {
    name: 'shipping',
    title: 'Shipping Details',
    type: 'document',
    fields: [
      { name: 'contactNumber', title: 'Contact Number', type: 'string' },
      { name: 'firstName', title: 'First Name', type: 'string' },
      { name: 'lastName', title: 'Last Name', type: 'string' },
      { name: 'email', title: 'Email Address', type: 'string' },
      { name: 'address', title: 'Address', type: 'string' },
      { name: 'city', title: 'City', type: 'string' },
      { name: 'province', title: 'Province', type: 'string' },
      { name: 'postalCode', title: 'Postal Code', type: 'string' },
      // Additional fields if needed
      { name: 'paymentMethod', title: 'Payment Method', type: 'string' },
      { name: 'grandTotal', title: 'Grand Total', type: 'number' },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          calendarTodayLabel: 'Today'
        }
      },
      // Optionally, you could store cart items as an array of objects
      {
        name: 'cartItems',
        title: 'Cart Items',
        type: 'array',
        of: [{ type: 'cartItem' }], // Reference the new cartItem schema
      }
      
    ],
    preview: {
      select: {
        id: '_id',
        contact: 'contactNumber',
        total: 'grandTotal'
      },
      prepare(selection: { id: string; contact: number ; total: number; }) {
        return {
          title: `Order # ${selection.id}`,
          subtitle: `${selection.contact} - $${selection.total}`
        }
      }
    }
    
  };
  
  export default ShippingSchema;