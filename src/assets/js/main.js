
function fullScreenVideo() {
	var playButton = $('.play-button');

		fullScreenVideoContainer = $('.full_screen_video_container'),
		videoIframeContainer = $('.full_screen_video_container .video'),
		videoIframe = $('.full_screen_video_container .video iframe'),
		closeButton = $('.full_screen_video_container .close_button');

	playButton.click( function(event) {
		var embedLink = $(this).attr("data-url");
		var videoURL = embedLink+"?rel=0&controls=1&showinfo=0&autoplay=1&wmode=transparent";
		
		fullScreenVideoContainer.toggle();
		videoIframe.attr('src', videoURL);

		event.stopPropagation();
	});

	closeButton
		.add(fullScreenVideoContainer)
		.click( function(event) {
		fullScreenVideoContainer.toggle();
		videoIframe.attr('src', '');

		event.stopPropagation();
	});
}
fullScreenVideo();