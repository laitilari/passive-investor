exports.getHomePage = (req, res) => {
    res.status(200).json({status: 'success', data: {welcome: 'welcome'}});
};

