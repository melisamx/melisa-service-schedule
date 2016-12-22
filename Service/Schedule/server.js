var redis = require('redis'),
    redisSubscribe = redis.createClient(),
    sheduleRequest = require('./logics/SheduleRequest');

function onNewJob(channel, data) {
    
    var event = JSON.parse(data);
    
    console.log('on new job', data);
    sheduleRequest.create(event.urlRun, event.postData, event.dateRun);
    
};

redisSubscribe.on('message', onNewJob);

redisSubscribe.subscribe('new.job');
console.log('Listen new.job ');