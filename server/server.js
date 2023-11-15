const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const itemRoutes = require('./routes/Item/itemsRoutes');
const userRoutes = require('./routes/User/UserRoutes');
const eventRoutes = require('./routes/Event/EventRoutes');
const roleRoutes = require('./routes/Roles/RolesRoutes');
const discountRoutes = require('./routes/Discount/DiscountRoutes');
const categoryRoutes = require('./routes/Category/CategoryRoutes');
const favouritesRoutes = require('./routes/Favourites/FavouritesRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json());

app.use(cookieParser());

app.use('', itemRoutes);
app.use('', userRoutes);
app.use('', eventRoutes);
app.use('', roleRoutes);
app.use('', discountRoutes);
app.use('', categoryRoutes);
app.use('', favouritesRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});