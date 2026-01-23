# Kiba Cheats - Admin Panel Guide

## 🔐 Admin Access

### Login URL
```
http://localhost:3000/admin/login
```

### Demo Credentials
- **Username**: `admin`
- **Password**: `admin`

### Production Setup
Update these in your `.env.local`:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## 📊 Admin Panel Features

### Dashboard (`/admin/dashboard`)
- **Revenue Stats**: Total and today's revenue
- **Order Counts**: Total and today's orders
- **Customer Metrics**: Total customers and average order value
- **License Keys**: Available keys count
- **Quick Actions**: Links to add keys, create coupons, view orders

### Orders (`/admin/orders`)
- View all customer orders
- Filter by status (Completed, Pending, Failed, Cancelled)
- See order details: ID, customer email, product, amount, license key status
- Real-time order tracking

### License Keys (`/admin/keys`)
- **Stock Overview**: See available keys per product
- **Low Stock Alerts**: Warnings when < 10 keys
- **Critical Alerts**: Red warnings when < 5 keys
- **Add Keys**: Bulk add license keys (one per line)
- **Key Status**: Track which keys are used and by whom
- **Usage History**: See when keys were assigned

### Coupons (`/admin/coupons`)
- **Create Coupons**: Generate discount codes
- **Discount Types**: Percentage or fixed amount
- **Expiration**: Set expiration dates
- **Usage Limits**: Limit how many times a coupon can be used
- **Minimum Purchase**: Set minimum order amount
- **Track Usage**: See how many times each coupon was used

### Products (`/admin/products`)
- Coming soon - currently edit in `lib/products.ts`

### Analytics (`/admin/analytics`)
- Coming soon - revenue charts, top products, etc.

### Settings (`/admin/settings`)
- Coming soon - configure integrations

## 🎯 Common Tasks

### Adding License Keys

1. Go to `/admin/keys`
2. Click "Add Keys" button
3. Select product from dropdown
4. Paste keys (one per line):
   ```
   XXXX-XXXX-XXXX-XXXX
   YYYY-YYYY-YYYY-YYYY
   ZZZZ-ZZZZ-ZZZZ-ZZZZ
   ```
5. Click "Add Keys"
6. Keys are now available for assignment

### Creating a Coupon

1. Go to `/admin/coupons`
2. Click "Create Coupon"
3. Fill in the form:
   - **Code**: `SAVE10` (will be uppercase)
   - **Type**: Percentage or Fixed
   - **Value**: `10` (for 10% or $10)
   - **Expiration**: Optional date
   - **Usage Limit**: Optional number
   - **Min Purchase**: Optional amount
4. Click "Create Coupon"

### Viewing Orders

1. Go to `/admin/orders`
2. See all orders with:
   - Order ID (links to Fanbasis)
   - Customer email
   - Product purchased
   - Amount paid
   - Status badge
   - License key delivery status
   - Date/time

### Checking Stock Levels

1. Go to `/admin/keys`
2. View stock overview cards
3. Look for:
   - 🟢 Green: Good stock (10+ keys)
   - 🟡 Amber: Low stock (5-9 keys)
   - 🔴 Red: Critical (< 5 keys)

## 🔒 Security

### Authentication
- Cookie-based authentication (no browser popup!)
- Session expires after 24 hours
- Logout clears all credentials

### Changing Password

Update in `.env.local`:
```env
ADMIN_PASSWORD=new_secure_password
```

Restart the server for changes to take effect.

### Best Practices
- Use a strong, unique password
- Don't share admin credentials
- Logout when done
- Monitor login attempts
- Change password regularly

## 🚀 Quick Actions

### From Dashboard
- Click "Add License Keys" → Go to keys page
- Click "Create Coupon" → Go to coupons page
- Click "View Orders" → Go to orders page

### Keyboard Shortcuts
- None currently - coming soon!

## 📱 Mobile Access

The admin panel is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Can't Login
1. Check username and password in `.env.local`
2. Make sure server is running
3. Clear browser cookies
4. Try incognito mode

### Data Not Loading
1. Check browser console for errors
2. Verify API routes are working
3. Check server logs
4. Restart the development server

### Keys Not Appearing
1. Verify keys were added successfully
2. Check product ID matches
3. Refresh the page
4. Check browser console

### Orders Not Showing
1. Make sure you've completed a test purchase
2. Check webhook is configured
3. Verify Fanbasis integration
4. Check server logs

## 💡 Tips

### Efficient Key Management
- Add keys in bulk (paste many at once)
- Monitor stock levels daily
- Set up Discord alerts for low stock
- Keep backup keys ready

### Coupon Strategy
- Create seasonal coupons
- Use percentage for higher-value items
- Set usage limits to control costs
- Track which coupons perform best

### Order Management
- Check orders daily
- Respond to out-of-stock quickly
- Monitor for failed payments
- Keep customers informed

## 📊 Understanding Stats

### Revenue
- **Total Revenue**: All-time earnings
- **Today's Revenue**: Earnings since midnight
- **Average Order Value**: Total revenue ÷ total orders

### Orders
- **Total Orders**: All completed orders
- **Today's Orders**: Orders since midnight
- **Conversion Rate**: Coming soon

### Customers
- **Total Customers**: Unique email addresses
- **Repeat Customers**: Coming soon

### License Keys
- **Available Keys**: Ready to assign
- **Used Keys**: Already assigned
- **Total Keys**: All keys in system

## 🎓 Best Practices

### Daily Tasks
1. Check dashboard stats
2. Review new orders
3. Monitor stock levels
4. Respond to Discord tickets

### Weekly Tasks
1. Add more license keys
2. Review coupon performance
3. Check revenue trends
4. Update product information

### Monthly Tasks
1. Analyze sales data
2. Plan promotions
3. Review customer feedback
4. Update pricing if needed

## 🆘 Support

Need help?
- **Discord**: https://discord.com/invite/82r9zWz2EA
- **Email**: support@kibacheats.com
- **Documentation**: See README.md and SETUP.md

---

**Admin Panel Version**: 1.0.0  
**Last Updated**: January 2024
