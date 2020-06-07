$(function(){
	$('.card-header').on('click',function(){
		$('.chatbox-area[data-id="'+$(this).attr('data-id')+'"]').toggleClass('heightZero');
	})
})