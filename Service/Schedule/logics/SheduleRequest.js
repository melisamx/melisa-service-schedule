var schedule = require('node-schedule'),
    logger = require('./Logger'),
    request = require('request'),
    config = require('config');

function init(urlRun, postData, dateRun) {
    
    var dateExecute = new Date(parseInt(dateRun)),
        dateNow = new Date(),
        event = {
            urlRun: urlRun,
            postData: postData
        };
        
    if(dateExecute <= dateNow) {
        
        dateExecute.setSeconds(dateNow.getSeconds() + 2);
        
    }
    
    logger.info('programing request in %s executed in %s', urlRun, dateExecute);
    
    schedule.scheduleJob(dateExecute, runJob.bind(null, event));
    
};

function runJob(event) {
    
    request.post({
        url: event.urlRun,
        form: event.postData,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Melisa services schedule)'
        },
        auth: {
            user: config.get('request.user'),
            pass: config.get('request.pass')
        }
    }, onCallBack.bind(event));
    
};

function onCallBack(err, response, body) {
    
    if( err) {
        
        logger.error('request failed %s', this.urlRun);
        logger.error(body);
        return;
        
    }
    
    var flag = true;
    
    try {

        JSON.parse(body);

    } catch(e) {
        
        flag = false;

    }
    
    if( flag) {
        
        logger.info('success request %s and response %s', this.urlRun, body);
        
    } else {
        
        logger.error('response no json in url %s, response: %s', this.urlRun, body);
        
    }
    
};

module.exports = {
    create: init
};
