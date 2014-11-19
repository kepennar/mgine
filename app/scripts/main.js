

var bckgVideo = function(id) {
	'use strict';
	$.okvideo({ video: id,
		volume: 100,
		loop: true,
		hd:true,
		adproof: true,
		annotations: false,
		onFinished: function() { console.log('finished'); },
		unstarted: function() { console.log('unstarted'); },
		onReady: function() { console.log('onready'); },
		onPlay: function() { console.log('onplay'); },
		onPause: function() { console.log('pause'); },
		buffering: function() { console.log('buffering'); },
		cued: function() { console.log('cued'); },
	});
};