const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

const users = [];
const groups = {};

function categorizeUsers(users) {
    const groups = {};
    users.forEach(user => {
        const groupKey = `${user.city}_${user.specialty}`;
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(user);
    });
    return groups;
}

app.get('/api/groups', (req, res) => {
    const categorizedGroups = categorizeUsers(users);
    res.json(categorizedGroups);
});

app.get('/api/groups/:group/members', (req, res) => {
    const group = req.params.group;
    const members = groups[group];
    if (members) {
        res.json(members);
    } else {
        res.status(404).json({ message: 'گروه یافت نشد.' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to Express server!');
});

app.post('/save_specialties', (req, res) => {
    const { specialties, fields } = req.body;

    if (!specialties || specialties.length === 0 || !fields || fields.length === 0) {
        return res.status(400).json({ message: 'Please select at least one specialty and one field.' });
    }

    res.status(200).json({ message: 'Specialties saved successfully!' });
});

app.post('/save_user', (req, res) => {
    const newUser = req.body;

    if (!newUser.firstName || !newUser.lastName || !newUser.nationalID || !newUser.phoneNumber || !newUser.city || !newUser.specialty) {
        return res.status(400).json({ message: 'اطلاعات کامل نیست' });
    }

    users.push(newUser);
    res.status(200).json({ message: 'کاربر با موفقیت ذخیره شد!' });
});

app.post('/save_groups', (req, res) => {
    const userGroups = req.body;

    if (!userGroups) {
        return res.status(400).json({ message: 'اطلاعات گروه‌ها کامل نیست' });
    }

    Object.assign(groups, userGroups);
    res.status(200).json({ message: 'گروه‌ها با موفقیت ذخیره شدند!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
