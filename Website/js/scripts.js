var channelName = 'UC2H7DyQrnr2RA4RSMF0B4ZA';
$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'id,snippet,contentDetails',
            id: channelName,
            key: 'AIzaSyDH3naOGPlOL175VfhVaRrzr0438MymNxM'
        },
        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
				channelTitle = item.snippet.title;
				channelThumbnail = item.snippet.thumbnails.medium.url;
				channelDescription = item.snippet.description;
                title = '<h5 class="masthead-heading ">' + channelTitle + '</h5>';
				$('#channelTitle').append(title); 
				desc = '<p class="masthead-subheading font-weight-light mb-0">'+ channelDescription +'</p>';
                $('#channelDescriptions').append(desc); 			
				thumb = '<img class="masthead-avatar mb-5" src=\"'+channelThumbnail+'\" alt="">';
                $('#channelThumbnails').append(thumb); 
				pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            });
        }
    );
    
    function getVids(){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 10,
                playlistId: pid,
                key: 'AIzaSyDH3naOGPlOL175VfhVaRrzr0438MymNxM'
            },
            function(data){
                var output;
                $.each(data.items, function(i, item){
                    console.log(item);
                    videoId = item.snippet.resourceId.videoId;
					videoTitle = item.snippet.title;
					videoThumb = item.snippet.thumbnails.medium.url;
					videoDescription = item.snippet.description;
					videoPublished = item.snippet.publishedAt;
                    output = '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
                    
                    $('#result').append(output);
                    
                });
            }
        );
    }
});

function _timeSince(a) {
        const s = Math.floor((new Date() - a) / 1000);
        let i = Math.floor(s / 31536000);
        if (i > 1) {
            return `${i} years ago`
        }
        i = Math.floor(s / 2592000);
        if (i > 1) {
            return `${i} months ago`
        }
        i = Math.floor(s / 86400);
        if (i > 1) {
            return `${i} days ago`
        }
        i = Math.floor(s / 3600);
        if (i > 1) {
            return `${i} hours ago`
        }
        i = Math.floor(s / 60);
        if (i > 1) {
            return `${i} minutes ago`
        }
        return `${Math.floor(s)} seconds ago`
    }

    function addCommas(a) {
        a += '';
        x = a.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? `.${x[1]}` : '';
        const b = /(\d+)(\d{3})/;
        while (b.test(x1)) {
            x1 = x1.replace(b, '$1' + ',' + '$2')
        }
        return x1 + x2
    }
