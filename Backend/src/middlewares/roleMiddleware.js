

const authorizeRoles = (...roles) => {
    return async(req, res, next) => {
        // console.log('User :', req.user);
        // console.log('User role:', req.user.role);
        // console.log('Required roles:', roles);
        
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Access Denied - No role found' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Access Denied - Required role: ' + roles.join(', ') + ', Your role: ' + req.user.role 
            });
        }
        
        next();
    };
};

module.exports = { authorizeRoles };