

function results( movie_id) {
    var vid;
    $.get("https://api.themoviedb.org/3/movie/"+movie_id+"?api_key=ab86ac207fd7e3cb523141b5290fa5b6&language=en-US",
        function(result){
            $.get("https://api.themoviedb.org/3/movie/"+movie_id+"/videos?api_key=ab86ac207fd7e3cb523141b5290fa5b6&language=en-US",
            function(x){vid = x.results[0].key;
                $('#main').html('');
                $('#main').css("background","none");
                console.log(result);

                function isScrolledIntoView(elem) {
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();

                    if($(elem).offset() !== undefined) {
                        var elemTop = $(elem).offset().top;
                        var elemBottom = elemTop + $(elem).height();

                        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                    }

                }

                $(window).scroll(function(){
                    if (isScrolledIntoView('.innermeter') === true) {
                        $('.innermeter').addClass('in-view');
                    }
                    else {
                        $('.innermeter').removeClass('in-view');
                    }

                });

                $(window).scroll(function(){
                    if(isScrolledIntoView('.movieDetails') === true) {
                        $('.movieDetails').addClass('spin');
                    }
                });
            });

    });

}


var movie_id;

$(function (){
    var now_playing;
    function add3Dots(string, limit)
    {
        var dots = "...";
        if(string.length > limit)
        {
           
            string = string.substring(0,limit) + dots;
        }

        return string;
    }

    function cards(x,i){
        $('#main').append('<div class="col-lg-10 col-sm-10 col-md-4 col-xs-12" style="margin-top:25px;padding: 0 5px 0 5px"><div class="card " id="card"'+i+'>'+
            '<div class="col-lg-3 col-xs-6 col-lg-6 col-md-6 col-sm-6 poster" id="poster"'+i+' style="padding: 0px;">'+
            '<a href="https://image.tmdb.org/t/p/w500'+x.results[i].poster_path+'"><img src="https://image.tmdb.org/t/p/w500'+x.results[i].poster_path+'" alt="picture"></a></div>'
            +'<div class="col-xs-6 col-lg-6 col-md-6 col-sm-6  content" id="content"'+i+'>'+
            '<h5 class="title" id="title"'+i+'  ><a href="#">'+x.results[i].original_title+'</a></h5>'+
            '<h6 class="overview">Overview</h6><p class ="overview">'+add3Dots(x.results[i].overview,170)+'</p>'+
            '<span class="rating" id="rating"+i+><i class="fa fa-star" aria-hidden="true"></i>&nbsp;&nbsp;'+x.results[i].vote_average+'</span>'+
            '</div>'+
            '</div></div>');
    }
    $.get("https://api.themoviedb.org/3/movie/now_playing?api_key=ab86ac207fd7e3cb523141b5290fa5b6&language=en-US&page=1",
        function popular(popularData){
            // console.log(popularData);
            popularData.results.forEach(function(x,i){cards(popularData,i);now_playing = popularData;});
            
        });

    $('#searchIcon').click(function () {
        console.log($('#searchBox').val());
        if($('#searchBox').val()!== "") {
            $('#results').html('');
            $.get('https://api.themoviedb.org/3/search/movie?api_key=ab86ac207fd7e3cb523141b5290fa5b6&language=en-US&query='+$('#searchBox').val()+'&page=1&include_adult=false',
            function search(searchData){
            
                $('#main').html('<h4 style="margin-bottom: -30px;</h4>');
                searchData.results.forEach(function(x,i){
                    cards(searchData,i);
                });
            });
        }
    });

    $('#now_playing').click(function() {$('#results').html('');now_playing.results.forEach(function(x,i){cards(now_playing,i)})});
            
});

