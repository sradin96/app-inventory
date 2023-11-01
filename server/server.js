const express = require('express');
const cors = require('cors');

const itemRoutes = require('./routes/Item/itemsRoutes');
const userRoutes = require('./routes/User/UserRoutes');
const eventRoutes = require('./routes/Event/EventRoutes');
const roleRoutes = require('./routes/Roles/RolesRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use('', itemRoutes);
app.use('', userRoutes);
app.use('', eventRoutes);
app.use('', roleRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
