function isAdmin(req, res, next) {
    if (req.userData.level === 'admin') {
        next()
    }
    else {
        return res.status(403).json({
            message: 'Access denied! User is NOT an admin!!'
        })
    }
}

function isCustomer(req, res, next) {
    console.log("LEVEL: " + req.userData.level)
    if (req.userData.level === 'customer') {
        next()
    }
    else {
        return res.status(403).json({
            message: 'Access denied! User is NOT a registered customer!!'
        })
    }
}

function isSeller(req, res, next) {
    if (req.userData.level === 'seller') {
        next()
    }
    else {
        return res.status(403).json({
            message: 'Access denied! User is NOT a registered seller!!'
        })
    }
}

function isAdminOrSeller(req, res, next) {
    if (req.userData.level === 'admin' || req.userData.level === 'seller') {
        next()
    }
    else {
        return res.status(403).json({
            message: 'Access denied! User is registered as customer!!'
        })
    }
}

function isAdminOrCustomer(req, res, next) {
    if (req.userData.level === 'admin' || req.userData.level === 'customer') {
        next()
    }
    else {
        return res.status(403).json({
            message: 'Access denied! User is registered as seller!!'
        })
    }
}

module.exports = {
    isAdmin,
    isSeller,
    isCustomer,
    isAdminOrSeller,
    isAdminOrCustomer
}