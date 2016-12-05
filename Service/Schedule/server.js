var redis = require('redis'),
    redisSubscribe = redis.createClient(),
    sheduleRequest = require('./logics/SheduleRequest');

function onBinnacleAdded(channel, data) {
    
    var event = JSON.parse(data);
    
    sheduleRequest.create(event.urlRun, event.postData, event.dateRun);
    
};

redisSubscribe.on('message', onBinnacleAdded);

redisSubscribe.subscribe('binnacle.added');
console.log('Listen binnacle.added ');